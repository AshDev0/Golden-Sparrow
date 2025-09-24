/**
 * WooCommerce Product Filtering System - COMPLETE SOLUTION WITH FIXED SEARCH
 * This addresses all issues: CORS, 500 errors, product details, and SEARCH functionality
 */

// CRITICAL: Ensure WooCommerce is loaded for REST API
add_action('rest_api_init', function() {
    // Include WooCommerce functions if not already loaded
    if (!function_exists('wc_get_product')) {
        include_once(WP_PLUGIN_DIR . '/woocommerce/woocommerce.php');
    }
}, 5);

// Fix CORS Issues - MUST be early in the request
add_action('init', function() {
    // Allow from your React development server
    $allowed_origins = array(
        'http://localhost:3000',
        'http://localhost:3001', 
        'https://goldensparrowuae.com',
        'https://goldensparrowuae.com'
    );
    
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
    } else {
        // For development, you might want to allow all origins
        header("Access-Control-Allow-Origin: *");
    }
    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    
    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }
});

// Ensure custom taxonomies work with products
add_action('init', function() {
    $taxonomies = ['equipment-buy', 'equipment-rent'];
    foreach ($taxonomies as $taxonomy) {
        if (taxonomy_exists($taxonomy)) {
            register_taxonomy_for_object_type($taxonomy, 'product');
        }
    }
}, 20);

// MAIN PRODUCTS ENDPOINT WITH FIXED SEARCH
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/products', array(
        'methods'  => 'GET',
        'callback' => 'get_filtered_products',
        'permission_callback' => '__return_true',
    ));
});

function get_filtered_products($request) {
    // Ensure WooCommerce is loaded
    if (!function_exists('wc_get_product')) {
        return new WP_Error('woocommerce_not_loaded', 'WooCommerce is not available', array('status' => 500));
    }
    
    // Ensure we're dealing with products
    if (!post_type_exists('product')) {
        return new WP_Error('product_post_type_not_found', 'Product post type does not exist', array('status' => 500));
    }
    
    $params = $request->get_params();
    $taxonomy = isset($params['taxonomy']) ? sanitize_text_field($params['taxonomy']) : 'equipment-buy';
    $page = isset($params['page']) ? absint($params['page']) : 1;
    $per_page = isset($params['per_page']) ? absint($params['per_page']) : 12;
    
    if (!taxonomy_exists($taxonomy)) {
        return new WP_Error('invalid_taxonomy', 'Taxonomy does not exist: ' . $taxonomy, array('status' => 400));
    }
    
    // Build tax query
    $tax_query = array(
        array(
            'taxonomy' => $taxonomy,
            'operator' => 'EXISTS'
        )
    );
    
    // Add term filter if provided
    if (!empty($params['term'])) {
        $term = get_term_by('slug', sanitize_text_field($params['term']), $taxonomy);
        if ($term) {
            $tax_query[0]['terms'] = array($term->term_id);
            $tax_query[0]['field'] = 'term_id';
            unset($tax_query[0]['operator']);
        }
    }
    
    // Query arguments
    $args = array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => $per_page,
        'paged' => $page,
        'tax_query' => $tax_query
    );
    
    // FIXED SEARCH FUNCTIONALITY
    if (!empty($params['search'])) {
        $search_term = sanitize_text_field($params['search']);
        
        // Method 1: Enhanced WordPress native search with custom meta fields
        $args['s'] = $search_term;
        
        // Add search in meta fields and product attributes
        add_filter('posts_search', function($search, $query) use ($search_term) {
            global $wpdb;
            
            if (empty($search_term)) {
                return $search;
            }
            
            // Search in post title, content, excerpt (default WordPress behavior)
            $search_query = $wpdb->prepare("
                AND (
                    ({$wpdb->posts}.post_title LIKE %s)
                    OR ({$wpdb->posts}.post_content LIKE %s)
                    OR ({$wpdb->posts}.post_excerpt LIKE %s)
                    OR EXISTS (
                        SELECT 1 FROM {$wpdb->postmeta} 
                        WHERE {$wpdb->postmeta}.post_id = {$wpdb->posts}.ID 
                        AND {$wpdb->postmeta}.meta_value LIKE %s
                    )
                    OR EXISTS (
                        SELECT 1 FROM {$wpdb->term_relationships} tr
                        INNER JOIN {$wpdb->term_taxonomy} tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
                        INNER JOIN {$wpdb->terms} t ON tt.term_id = t.term_id
                        WHERE tr.object_id = {$wpdb->posts}.ID
                        AND t.name LIKE %s
                    )
                )
            ", 
                '%' . $wpdb->esc_like($search_term) . '%',
                '%' . $wpdb->esc_like($search_term) . '%',
                '%' . $wpdb->esc_like($search_term) . '%',
                '%' . $wpdb->esc_like($search_term) . '%',
                '%' . $wpdb->esc_like($search_term) . '%'
            );
            
            return $search_query;
        }, 10, 2);
        
        // Alternative Method: Use meta_query for specific fields (uncomment if needed)
        /*
        $meta_query = isset($args['meta_query']) ? $args['meta_query'] : array();
        $meta_query[] = array(
            'relation' => 'OR',
            array(
                'key' => '_sku',
                'value' => $search_term,
                'compare' => 'LIKE'
            ),
            array(
                'key' => 'equipment_location',
                'value' => $search_term,
                'compare' => 'LIKE'
            ),
            array(
                'key' => 'manufacture_year',
                'value' => $search_term,
                'compare' => 'LIKE'
            )
        );
        $args['meta_query'] = $meta_query;
        */
    }
    
    // Add price filter
    $meta_query = isset($args['meta_query']) ? $args['meta_query'] : array();
    if (isset($params['min_price']) && is_numeric($params['min_price']) && $params['min_price'] !== '') {
        $meta_query[] = array(
            'key' => '_price',
            'value' => floatval($params['min_price']),
            'compare' => '>=',
            'type' => 'NUMERIC'
        );
    }
    if (isset($params['max_price']) && is_numeric($params['max_price']) && $params['max_price'] !== '') {
        $meta_query[] = array(
            'key' => '_price',
            'value' => floatval($params['max_price']),
            'compare' => '<=',
            'type' => 'NUMERIC'
        );
    }
    if (!empty($meta_query)) {
        if (count($meta_query) > 1) {
            $meta_query['relation'] = 'AND';
        }
        $args['meta_query'] = $meta_query;
    }
    
    // Add sorting
    $orderby = isset($params['orderby']) ? $params['orderby'] : 'date';
    $order = isset($params['order']) ? strtoupper($params['order']) : 'DESC';
    
    switch($orderby) {
        case 'price':
            $args['orderby'] = 'meta_value_num';
            $args['meta_key'] = '_price';
            break;
        case 'relevance':
            if (!empty($params['search'])) {
                $args['orderby'] = 'relevance';
            } else {
                $args['orderby'] = 'date';
            }
            break;
        default:
            $args['orderby'] = $orderby;
    }
    $args['order'] = $order;
    
    // Add additional filters (brands, conditions, etc.)
    $filter_taxonomies = array('pa_brand', 'pa_condition', 'pa_model', 'pa_industry', 'pa_availability','pa_sales-method',
        'pa_equipment-type', 'product_cat', 'product_tag', 'pa_year-of-manufacture', 'pa_operating-weight');
    foreach ($filter_taxonomies as $filter_tax) {
        if (!empty($params[$filter_tax])) {
            $filter_terms = is_array($params[$filter_tax]) 
                ? $params[$filter_tax] 
                : explode(',', $params[$filter_tax]);
            
            $term_ids = array();
            foreach ($filter_terms as $term_slug) {
                $term = get_term_by('slug', trim($term_slug), $filter_tax);
                if ($term) {
                    $term_ids[] = $term->term_id;
                }
            }
            
            if (!empty($term_ids)) {
                $tax_query[] = array(
                    'taxonomy' => $filter_tax,
                    'field' => 'term_id',
                    'terms' => $term_ids,
                    'operator' => 'IN'
                );
            }
        }
    }
    
    if (count($tax_query) > 1) {
        $args['tax_query'] = array_merge(array('relation' => 'AND'), $tax_query);
    } else {
        $args['tax_query'] = $tax_query;
    }
    
    // Execute query
    $query = new WP_Query($args);
    $products = array();
    
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $product_id = get_the_ID();
            
            // Try to get WooCommerce product
            $wc_product = wc_get_product($product_id);
            
            if ($wc_product) {
                $product_data = array(
                    'id' => $product_id,
                    'name' => get_the_title(),
                    'slug' => get_post_field('post_name', $product_id),
                    'price' => $wc_product->get_price(),
                    'regular_price' => $wc_product->get_regular_price(),
                    'sale_price' => $wc_product->get_sale_price(),
                    'on_sale' => $wc_product->is_on_sale(),
                    'stock_status' => $wc_product->get_stock_status(),
                    'permalink' => get_permalink($product_id),
                    'currency_symbol' => html_entity_decode(get_woocommerce_currency_symbol()),
                    'short_description' => $wc_product->get_short_description(),
                    'images' => array(),
                    'sku' => $wc_product->get_sku(), // Added SKU for better search identification
                );
                
                // Add product tags
                $tags = wp_get_post_terms($product_id, 'product_tag');
                $product_data['tags'] = array_map(function($tag) {
                    return array(
                        'id' => $tag->term_id,
                        'name' => $tag->name,
                        'slug' => $tag->slug
                    );
                }, $tags);
                
                // Add product attributes including year-of-manufacture
                $product_data['attributes'] = array();
                $attribute_taxonomies = array(
                    'pa_brand' => 'Brand',
                    'pa_condition' => 'Condition', 
                    'pa_model' => 'Model',
                    'pa_industry' => 'Industry',
                    'pa_availability' => 'Availability',
                    'pa_sales-method' => 'Sales Method',
                    'pa_equipment-type' => 'Equipment Type',
                    'pa_year-of-manufacture' => 'Year of Manufacture',
                    'pa_operating-weight' => 'Operating Weight'
                );
                
                foreach ($attribute_taxonomies as $taxonomy => $label) {
                    if (taxonomy_exists($taxonomy)) {
                        $terms = wp_get_post_terms($product_id, $taxonomy);
                        if (!is_wp_error($terms) && !empty($terms)) {
                            $product_data['attributes'][$taxonomy] = array_map(function($term) {
                                return $term->name;
                            }, $terms);
                        }
                    }
                }
                
                // Also get ACF fields if available (fallback for year)
                if (function_exists('get_field')) {
                    $acf_year = get_field('manufacture_year', $product_id);
                    if ($acf_year && empty($product_data['attributes']['pa_year-of-manufacture'])) {
                        $product_data['attributes']['pa_year-of-manufacture'] = array($acf_year);
                    }
                }
                
                // Also get custom meta fields as fallback
                $meta_year = get_post_meta($product_id, 'manufacture_year', true);
                if ($meta_year && empty($product_data['attributes']['pa_year-of-manufacture'])) {
                    $product_data['attributes']['pa_year-of-manufacture'] = array($meta_year);
                }
                
                // Get featured image
                $image_id = get_post_thumbnail_id($product_id);
                if ($image_id) {
                    $product_data['images'][] = wp_get_attachment_url($image_id);
                }
                
                // Add search relevance score if searching
                if (!empty($params['search'])) {
                    $search_term = strtolower($params['search']);
                    $title = strtolower(get_the_title());
                    $content = strtolower(get_the_content());
                    
                    $relevance = 0;
                    if (strpos($title, $search_term) !== false) $relevance += 10;
                    if (strpos($content, $search_term) !== false) $relevance += 5;
                    if (strpos(strtolower($wc_product->get_sku()), $search_term) !== false) $relevance += 8;
                    
                    $product_data['search_relevance'] = $relevance;
                }
                
                $products[] = $product_data;
            }
        }
        wp_reset_postdata();
        
        // Remove the search filter to avoid affecting other queries
        remove_all_filters('posts_search');
        
        // Sort by relevance if searching and orderby is relevance
        if (!empty($params['search']) && isset($params['orderby']) && $params['orderby'] === 'relevance') {
            usort($products, function($a, $b) {
                return ($b['search_relevance'] ?? 0) <=> ($a['search_relevance'] ?? 0);
            });
        }
    }
    
    return array(
        'products' => $products,
        'total' => $query->found_posts,
        'total_pages' => $query->max_num_pages,
        'current_page' => $page,
        'per_page' => $per_page,
        'search_term' => isset($params['search']) ? $params['search'] : '', // Added for debugging
    );
}

// SEARCH SUGGESTIONS ENDPOINT (New Addition)
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/search-suggestions', array(
        'methods'  => 'GET',
        'callback' => 'get_search_suggestions',
        'permission_callback' => '__return_true',
    ));
});

function get_search_suggestions($request) {
    $query = $request->get_param('q');
    $taxonomy = $request->get_param('taxonomy') ?: 'equipment-buy';
    
    if (empty($query) || strlen($query) < 2) {
        return array('suggestions' => array());
    }
    
    $suggestions = array();
    
    // Search in product titles
    $products = get_posts(array(
        'post_type' => 'product',
        'post_status' => 'publish',
        's' => $query,
        'posts_per_page' => 5,
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'operator' => 'EXISTS'
            )
        )
    ));
    
    foreach ($products as $product) {
        $suggestions[] = array(
            'type' => 'product',
            'title' => $product->post_title,
            'id' => $product->ID
        );
    }
    
    // Search in taxonomies
    $taxonomies = array('pa_brand', 'pa_model', 'pa_equipment-type');
    foreach ($taxonomies as $tax) {
        $terms = get_terms(array(
            'taxonomy' => $tax,
            'name__like' => $query,
            'number' => 3,
            'hide_empty' => true
        ));
        
        foreach ($terms as $term) {
            $suggestions[] = array(
                'type' => 'filter',
                'title' => $term->name,
                'taxonomy' => $tax,
                'slug' => $term->slug
            );
        }
    }
    
    return array('suggestions' => array_slice($suggestions, 0, 10));
}

// FILTERS ENDPOINT (Unchanged)
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/filters', array(
        'methods'  => 'GET',
        'callback' => 'get_filter_options',
        'permission_callback' => '__return_true',
    ));
});

function get_filter_options($request) {
    $taxonomy = $request->get_param('taxonomy');
    
    if (!taxonomy_exists($taxonomy)) {
        return new WP_Error('invalid_taxonomy', 'Invalid taxonomy', array('status' => 400));
    }
    
    // Get all products in this taxonomy to determine available filters
    $product_ids = get_posts(array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'fields' => 'ids',
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'operator' => 'EXISTS'
            )
        )
    ));
    
    $filters = array();
    
    // Define filter taxonomies
    $filter_configs = array(
        'pa_brand' => 'Brand',
        'pa_condition' => 'Condition',
        'pa_model' => 'Model',
        'pa_industry' => 'Industry',
        'pa_availability' => 'Availability',
        'pa_sales-method' => 'Sales Method',
        'pa_equipment-type' => 'Equipment Type',
        'product_cat' => 'Categories',
        'product_tag' => 'Tags',
		'pa_year-of-manufacture' => 'Year of Manufacture',
		'pa_operating-weight' => 'Operating Weight'
    );
    
    foreach ($filter_configs as $tax_slug => $label) {
        if (!taxonomy_exists($tax_slug)) continue;
        
        $terms = wp_get_object_terms($product_ids, $tax_slug, array(
            'orderby' => 'name',
            'order' => 'ASC'
        ));
        
        if (!is_wp_error($terms) && !empty($terms)) {
            $options = array();
            foreach ($terms as $term) {
                $options[] = array(
                    'slug' => $term->slug,
                    'name' => $term->name,
                    'count' => $term->count
                );
            }
            
            $filters[$tax_slug] = array(
                'label' => $label,
                'options' => $options
            );
        }
    }
    
    return array(
        'taxonomy' => $taxonomy,
        'filters' => $filters,
        'total' => count($product_ids)
    );
}

// SINGLE PRODUCT ENDPOINT (Unchanged)
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/product/(?P<id>\d+)', array(
        'methods'  => 'GET',
        'callback' => 'get_single_product',
        'permission_callback' => '__return_true',
        'args' => array(
            'id' => array(
                'validate_callback' => function($param) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
});

function get_single_product($request) {
    $product_id = absint($request['id']);
    
    if ($product_id <= 0) {
        return new WP_Error('invalid_id', 'Invalid product ID', array('status' => 400));
    }
    
    $post = get_post($product_id);

    if (!$post || $post->post_type !== 'product' || $post->post_status !== 'publish') {
        return new WP_Error('not_found', 'Product not found', array('status' => 404));
    }

    $response = array(
        'id' => $product_id,
        'name' => $post->post_title,
        'slug' => $post->post_name,
        'description' => $post->post_content,
        'short_description' => $post->post_excerpt,
        'permalink' => get_permalink($product_id),
        'images' => array(),
        'currency_symbol' => '$', // default
    );

    if (function_exists('wc_get_product')) {
        $product = wc_get_product($product_id);

        if ($product) {
            $response['price'] = $product->get_price();
            $response['regular_price'] = $product->get_regular_price();
            $response['sale_price'] = $product->get_sale_price();
            $response['on_sale'] = $product->is_on_sale();
            $response['stock_status'] = $product->get_stock_status();
            $response['currency_symbol'] = html_entity_decode(get_woocommerce_currency_symbol());
            $response['sku'] = $product->get_sku();

            // Images
            $image_ids = $product->get_gallery_image_ids();
            if ($product->get_image_id()) {
                array_unshift($image_ids, $product->get_image_id());
            }
            foreach ($image_ids as $image_id) {
                $response['images'][] = array(
                    'src' => wp_get_attachment_url($image_id),
                    'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail')
                );
            }

            // Enhanced Attributes - Include all product attributes
            $response['attributes'] = array();
            $attribute_taxonomies = array(
                'pa_brand' => 'Brand',
                'pa_condition' => 'Condition', 
                'pa_model' => 'Model',
                'pa_industry' => 'Industry',
                'pa_availability' => 'Availability',
                'pa_sales-method' => 'Sales Method',
                'pa_equipment-type' => 'Equipment Type',
                'pa_year-of-manufacture' => 'Year of Manufacture',
                'pa_operating-weight' => 'Operating Weight'
            );
            
            foreach ($attribute_taxonomies as $taxonomy => $label) {
                if (taxonomy_exists($taxonomy)) {
                    $terms = wp_get_post_terms($product_id, $taxonomy);
                    if (!is_wp_error($terms) && !empty($terms)) {
                        $response['attributes'][$taxonomy] = array_map(function($term) {
                            return $term->name;
                        }, $terms);
                    }
                }
            }
            
            // Also get WooCommerce product attributes
            $wc_attributes = $product->get_attributes();
            foreach ($wc_attributes as $attribute) {
                if ($attribute->is_taxonomy()) {
                    $terms = wp_get_post_terms($product_id, $attribute->get_name(), array('fields' => 'names'));
                    if (!empty($terms)) {
                        $response['attributes'][$attribute->get_name()] = $terms;
                    }
                }
            }
            
            // Add ACF fields as fallback for year
            if (function_exists('get_field')) {
                $acf_year = get_field('manufacture_year', $product_id);
                if ($acf_year && empty($response['attributes']['pa_year-of-manufacture'])) {
                    $response['attributes']['pa_year-of-manufacture'] = array($acf_year);
                }
            }
            
            // Add custom meta fields as fallback
            $meta_year = get_post_meta($product_id, 'manufacture_year', true);
            if ($meta_year && empty($response['attributes']['pa_year-of-manufacture'])) {
                $response['attributes']['pa_year-of-manufacture'] = array($meta_year);
            }

            // Related products
            $response['related_ids'] = $product->get_related(5);
            $response['upsell_ids'] = $product->get_upsell_ids();
            $response['cross_sell_ids'] = $product->get_cross_sell_ids();

            // Ratings
            $response['average_rating'] = $product->get_average_rating();
            $response['rating_count'] = $product->get_rating_count();
            $response['review_count'] = $product->get_review_count();

            // Reviews
            $reviews = get_comments(array(
                'post_id' => $product_id,
                'status' => 'approve',
                'type' => 'review'
            ));
            $response['reviews'] = $reviews;

            // Variations
            if ($product->is_type('variable')) {
                $response['variations'] = $product->get_available_variations();
                $response['default_attributes'] = $product->get_default_attributes();
            }
        }
    } else {
        // Non-WooCommerce fallback
        $response['price'] = get_post_meta($product_id, '_price', true);
        $response['regular_price'] = get_post_meta($product_id, '_regular_price', true);
        $response['sale_price'] = get_post_meta($product_id, '_sale_price', true);
        $response['stock_status'] = get_post_meta($product_id, '_stock_status', true);
        $response['sku'] = get_post_meta($product_id, '_sku', true);

        $thumbnail_id = get_post_thumbnail_id($product_id);
        if ($thumbnail_id) {
            $response['images'][] = array(
                'src' => wp_get_attachment_url($thumbnail_id),
                'thumbnail' => wp_get_attachment_image_url($thumbnail_id, 'thumbnail')
            );
        }
    }

    // Custom Fields
    $response['custom_fields'] = get_post_meta($product_id);

    // Specific meta fields
    $response['location'] = get_post_meta($product_id, 'equipment_location', true);
    $response['year'] = get_post_meta($product_id, 'manufacture_year', true);

    // Tags
    $tags = wp_get_post_terms($product_id, 'product_tag');
    $response['tags'] = array_map(function($tag) {
        return array(
            'id' => $tag->term_id,
            'name' => $tag->name,
            'slug' => $tag->slug
        );
    }, $tags);

    // ACF Fields
    if (function_exists('get_field')) {
        $response['acf_fields'] = get_fields($product_id);
        $response['specifications'] = get_field('product_specifications', $product_id);
    }

    // Taxonomy Check
    if (has_term('', 'equipment-buy', $product_id)) {
        $response['taxonomy'] = 'equipment-buy';
    } elseif (has_term('', 'equipment-rent', $product_id)) {
        $response['taxonomy'] = 'equipment-rent';
    }

    return rest_ensure_response($response);
}

// Debug endpoint to test if everything is working
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/test', array(
        'methods'  => 'GET',
        'callback' => function() {
            return array(
                'status' => 'ok',
                'woocommerce' => function_exists('wc_get_product'),
                'php_version' => phpversion(),
                'wordpress_version' => get_bloginfo('version'),
                'timestamp' => current_time('mysql')
            );
        },
        'permission_callback' => '__return_true',
    ));
});

// SEARCH TEST ENDPOINT (New Addition for Testing)
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/search-test', array(
        'methods'  => 'GET',
        'callback' => function($request) {
            $search_term = $request->get_param('search');
            
            if (empty($search_term)) {
                return array('error' => 'No search term provided');
            }
            
            $args = array(
                'post_type' => 'product',
                'post_status' => 'publish',
                's' => $search_term,
                'posts_per_page' => 5
            );
            
            $query = new WP_Query($args);
            $results = array();
            
            if ($query->have_posts()) {
                while ($query->have_posts()) {
                    $query->the_post();
                    $results[] = array(
                        'id' => get_the_ID(),
                        'title' => get_the_title(),
                        'content_snippet' => wp_trim_words(get_the_content(), 20)
                    );
                }
                wp_reset_postdata();
            }
            
            return array(
                'search_term' => $search_term,
                'found_posts' => $query->found_posts,
                'results' => $results,
                'sql' => $query->request // For debugging
            );
        },
        'permission_callback' => '__return_true',
    ));
});

// Add this endpoint to fetch multiple products at once
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/products/batch', array(
        'methods'  => 'GET',
        'callback' => 'get_products_batch',
        'permission_callback' => '__return_true',
        'args' => array(
            'ids' => array(
                'required' => true,
                'validate_callback' => function($param) {
                    return is_string($param) || is_array($param);
                }
            ),
        ),
    ));
});

function get_products_batch($request) {
    $ids = $request->get_param('ids');
    
    if (empty($ids)) {
        return new WP_Error('missing_ids', 'Product IDs are required', array('status' => 400));
    }
    
    // Handle both string and array
    if (is_string($ids)) {
        $ids = explode(',', $ids);
    }
    
    // Sanitize and validate IDs
    $product_ids = array_map('absint', $ids);
    $product_ids = array_filter($product_ids, function($id) {
        return $id > 0;
    });
    
    if (empty($product_ids)) {
        return new WP_Error('invalid_ids', 'No valid product IDs provided', array('status' => 400));
    }
    
    // Limit to 10 products for performance
    $product_ids = array_slice($product_ids, 0, 10);
    
    $products = array();
    
    foreach ($product_ids as $product_id) {
        $product = wc_get_product($product_id);
        if ($product && $product->get_status() === 'publish' && $product->exists()) {
            // Get product tags
            $tags = wp_get_post_terms($product_id, 'product_tag');
            $product_tags = array_map(function($tag) {
                return array(
                    'id' => $tag->term_id,
                    'name' => $tag->name,
                    'slug' => $tag->slug
                );
            }, $tags);
            
            $products[] = array(
                'id' => $product_id,
                'name' => $product->get_name(),
                'slug' => $product->get_slug(),
                'price' => $product->get_price(),
                'regular_price' => $product->get_regular_price(),
                'sale_price' => $product->get_sale_price(),
                'on_sale' => $product->is_on_sale(),
                'stock_status' => $product->get_stock_status(),
                'permalink' => get_permalink($product_id),
                'currency_symbol' => html_entity_decode(get_woocommerce_currency_symbol()),
                'images' => array(wp_get_attachment_url(get_post_thumbnail_id($product_id))),
                'short_description' => wp_strip_all_tags($product->get_short_description()),
                'tags' => $product_tags,
            );
        }
    }
    
    return rest_ensure_response(array(
        'products' => $products,
        'total' => count($products)
    ));
}

// BRANDS ENDPOINTS - New Addition
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/brands', array(
        'methods'  => 'GET',
        'callback' => 'get_all_brands',
        'permission_callback' => '__return_true',
    ));
});

function get_all_brands($request) {
    $taxonomy = $request->get_param('taxonomy') ?: 'equipment-buy';
    
    // Validate taxonomy exists
    if (!taxonomy_exists($taxonomy)) {
        return new WP_Error('invalid_taxonomy', 'Invalid taxonomy: ' . $taxonomy, array('status' => 400));
    }
    
    // Get all products in this taxonomy to determine available brands
    $product_ids = get_posts(array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'fields' => 'ids',
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'operator' => 'EXISTS'
            )
        )
    ));
    
    if (empty($product_ids)) {
        return rest_ensure_response(array(
            'brands' => array(),
            'total' => 0,
            'taxonomy' => $taxonomy
        ));
    }
    
    // Get brands that have products in this taxonomy
    $brands = wp_get_object_terms($product_ids, 'pa_brand', array(
        'orderby' => 'name',
        'order' => 'ASC',
        'hide_empty' => true
    ));
    
    if (is_wp_error($brands)) {
        return new WP_Error('brands_error', 'Failed to fetch brands', array('status' => 500));
    }
    
    $formatted_brands = array();
    foreach ($brands as $brand) {
        // Get brand metadata including logo
        $brand_meta = get_term_meta($brand->term_id);
        
        // Try to get brand logo from various possible meta keys
        $logo_url = '';
        if (isset($brand_meta['logo']) && !empty($brand_meta['logo'][0]) && filter_var($brand_meta['logo'][0], FILTER_VALIDATE_URL)) {
            $logo_url = esc_url($brand_meta['logo'][0]);
        } elseif (isset($brand_meta['brand_logo']) && !empty($brand_meta['brand_logo'][0]) && filter_var($brand_meta['brand_logo'][0], FILTER_VALIDATE_URL)) {
            $logo_url = esc_url($brand_meta['brand_logo'][0]);
        } elseif (isset($brand_meta['image']) && !empty($brand_meta['image'][0]) && filter_var($brand_meta['image'][0], FILTER_VALIDATE_URL)) {
            $logo_url = esc_url($brand_meta['image'][0]);
        } elseif (isset($brand_meta['thumbnail_id']) && !empty($brand_meta['thumbnail_id'][0]) && is_numeric($brand_meta['thumbnail_id'][0])) {
            // If it's an attachment ID, get the URL
            $attachment_url = wp_get_attachment_url(absint($brand_meta['thumbnail_id'][0]));
            if ($attachment_url) {
                $logo_url = esc_url($attachment_url);
            }
        }
        
        $formatted_brands[] = array(
            'id' => $brand->term_id,
            'name' => $brand->name,
            'slug' => $brand->slug,
            'description' => $brand->description ?: '',
            'count' => $brand->count,
            'url' => "/brands/{$brand->slug}",
            'products_url' => "/products?taxonomy={$taxonomy}&pa_brand={$brand->slug}",
            'logo' => $logo_url
        );
    }
    
    return rest_ensure_response(array(
        'brands' => $formatted_brands,
        'total' => count($formatted_brands),
        'taxonomy' => $taxonomy
    ));
}

// SINGLE BRAND ENDPOINT
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/brands/(?P<slug>[a-zA-Z0-9_-]+)', array(
        'methods'  => 'GET',
        'callback' => 'get_single_brand',
        'permission_callback' => '__return_true',
        'args' => array(
            'slug' => array(
                'validate_callback' => function($param) {
                    return !empty($param);
                }
            ),
        ),
    ));
});

function get_single_brand($request) {
    $brand_slug = sanitize_text_field($request['slug']);
    $taxonomy = $request->get_param('taxonomy') ?: 'equipment-buy';
    
    // Get brand term
    $brand = get_term_by('slug', $brand_slug, 'pa_brand');
    
    if (!$brand || is_wp_error($brand)) {
        return new WP_Error('brand_not_found', 'Brand not found', array('status' => 404));
    }
    
    // Get products for this brand in the specified taxonomy
    $product_args = array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'fields' => 'ids',
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => $taxonomy,
                'operator' => 'EXISTS'
            ),
            array(
                'taxonomy' => 'pa_brand',
                'field' => 'slug',
                'terms' => $brand_slug
            )
        )
    );
    
    $product_ids = get_posts($product_args);
    $product_count = count($product_ids);
    
    // Get brand metadata if available
    $brand_meta = get_term_meta($brand->term_id);
    
    // Enhanced logo detection similar to get_all_brands
    $logo_url = '';
    if (isset($brand_meta['logo']) && !empty($brand_meta['logo'][0])) {
        $logo_url = $brand_meta['logo'][0];
    } elseif (isset($brand_meta['brand_logo']) && !empty($brand_meta['brand_logo'][0])) {
        $logo_url = $brand_meta['brand_logo'][0];
    } elseif (isset($brand_meta['image']) && !empty($brand_meta['image'][0])) {
        $logo_url = $brand_meta['image'][0];
    } elseif (isset($brand_meta['thumbnail_id']) && !empty($brand_meta['thumbnail_id'][0])) {
        $logo_url = wp_get_attachment_url($brand_meta['thumbnail_id'][0]);
    }

    return rest_ensure_response(array(
        'id' => $brand->term_id,
        'name' => $brand->name,
        'slug' => $brand->slug,
        'description' => $brand->description ?: '',
        'count' => $product_count,
        'products_url' => "/products?taxonomy={$taxonomy}&pa_brand={$brand_slug}",
        'logo' => $logo_url,
        'website' => isset($brand_meta['website']) ? $brand_meta['website'][0] : '',
        'founded' => isset($brand_meta['founded']) ? $brand_meta['founded'][0] : '',
        'country' => isset($brand_meta['country']) ? $brand_meta['country'][0] : '',
        'product_ids' => array_slice($product_ids, 0, 12) // Return first 12 product IDs
    ));
}

// BRAND TAXONOMY ADMIN FIELDS - Add custom fields for brand logo upload
add_action('pa_brand_add_form_fields', 'add_brand_logo_field');
add_action('pa_brand_edit_form_fields', 'edit_brand_logo_field');

function add_brand_logo_field() {
    ?>
    <div class="form-field">
        <label for="brand_logo">Brand Logo</label>
        <input type="text" name="brand_logo" id="brand_logo" value="" />
        <input type="button" class="button" id="brand_logo_upload" value="Upload Logo" />
        <p class="description">Upload or enter URL for brand logo image</p>
    </div>
    <script>
    jQuery(document).ready(function($) {
        $('#brand_logo_upload').click(function(e) {
            e.preventDefault();
            var image = wp.media({ 
                title: 'Upload Brand Logo',
                multiple: false
            }).open().on('select', function() {
                var uploaded_image = image.state().get('selection').first();
                var image_url = uploaded_image.toJSON().url;
                $('#brand_logo').val(image_url);
            });
        });
    });
    </script>
    <?php
}

function edit_brand_logo_field($term) {
    $brand_logo = get_term_meta($term->term_id, 'brand_logo', true);
    ?>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="brand_logo">Brand Logo</label></th>
        <td>
            <input type="text" name="brand_logo" id="brand_logo" value="<?php echo esc_attr($brand_logo); ?>" />
            <input type="button" class="button" id="brand_logo_upload" value="Upload Logo" />
            <p class="description">Upload or enter URL for brand logo image</p>
            <?php if($brand_logo): ?>
                <br><img src="<?php echo esc_url($brand_logo); ?>" style="max-width: 100px; height: auto; margin-top: 10px;" />
            <?php endif; ?>
        </td>
    </tr>
    <script>
    jQuery(document).ready(function($) {
        $('#brand_logo_upload').click(function(e) {
            e.preventDefault();
            var image = wp.media({ 
                title: 'Upload Brand Logo',
                multiple: false
            }).open().on('select', function() {
                var uploaded_image = image.state().get('selection').first();
                var image_url = uploaded_image.toJSON().url;
                $('#brand_logo').val(image_url);
            });
        });
    });
    </script>
    <?php
}

// Save brand logo field
add_action('created_pa_brand', 'save_brand_logo_field');
add_action('edited_pa_brand', 'save_brand_logo_field');

function save_brand_logo_field($term_id) {
    if (isset($_POST['brand_logo']) && !empty($_POST['brand_logo'])) {
        $logo_url = sanitize_url($_POST['brand_logo']);
        if (filter_var($logo_url, FILTER_VALIDATE_URL)) {
            update_term_meta($term_id, 'brand_logo', $logo_url);
            // Also save as 'logo' for backward compatibility
            update_term_meta($term_id, 'logo', $logo_url);
        }
    }
}

// BRAND LOGO TEST ENDPOINT - Helper to add sample brand logos
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/add-brand-logos', array(
        'methods'  => 'POST',
        'callback' => 'add_sample_brand_logos',
        'permission_callback' => '__return_true',
    ));
});

function add_sample_brand_logos($request) {
    // Sample brand logos - you can replace these with actual logo URLs
    $sample_logos = array(
        'caterpillar' => 'https://logos-world.net/wp-content/uploads/2020/11/Caterpillar-Logo.png',
        'kobelco' => 'https://logos-world.net/wp-content/uploads/2023/01/Kobelco-Logo.png',
        'komatsu' => 'https://logos-world.net/wp-content/uploads/2021/11/Komatsu-Logo.png',
        'volvo' => 'https://logos-world.net/wp-content/uploads/2020/04/Volvo-Logo.png',
        'jcb' => 'https://1000logos.net/wp-content/uploads/2017/05/JCB-Logo.png',
        'bobcat' => 'https://logos-world.net/wp-content/uploads/2020/12/Bobcat-Logo.png'
    );
    
    $updated_brands = array();
    
    foreach ($sample_logos as $brand_slug => $logo_url) {
        $brand = get_term_by('slug', $brand_slug, 'pa_brand');
        if ($brand) {
            update_term_meta($brand->term_id, 'brand_logo', $logo_url);
            update_term_meta($brand->term_id, 'logo', $logo_url);
            $updated_brands[] = array(
                'brand' => $brand->name,
                'slug' => $brand_slug,
                'logo_added' => $logo_url
            );
        }
    }
    
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Brand logos added',
        'updated_brands' => $updated_brands
    ));
}

// CATEGORY IMAGE FUNCTIONALITY - Complete Implementation

// Add custom taxonomy image support for categories
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/categories', array(
        'methods' => 'GET',
        'callback' => 'get_categories_with_images',
        'permission_callback' => '__return_true',
    ));
});

function get_categories_with_images($request) {
    $taxonomy = $request->get_param('taxonomy') ?: 'equipment-buy';
    
    // Validate taxonomy exists
    if (!taxonomy_exists($taxonomy)) {
        return new WP_Error('invalid_taxonomy', 'Invalid taxonomy: ' . $taxonomy, array('status' => 400));
    }
    
    // Get products in taxonomy to get relevant categories
    $product_ids = get_posts(array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'fields' => 'ids',
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'operator' => 'EXISTS'
            )
        )
    ));
    
    if (empty($product_ids)) {
        return rest_ensure_response(array(
            'success' => true,
            'categories' => array(),
            'total' => 0,
            'taxonomy' => $taxonomy
        ));
    }
    
    // Get categories that have products in this taxonomy
    $categories = wp_get_object_terms($product_ids, 'product_cat', array(
        'orderby' => 'name',
        'order' => 'ASC',
        'hide_empty' => true
    ));
    
    if (is_wp_error($categories)) {
        return new WP_Error('categories_error', 'Failed to fetch categories', array('status' => 500));
    }
    
    $formatted_categories = array();
    
    foreach ($categories as $category) {
        // Get category metadata including image
        $category_meta = get_term_meta($category->term_id);
        
        // Try to get category image from various possible meta keys
        $image_data = null;
        $image_id = '';
        $image_url = '';
        
        // Check for different image meta keys
        if (isset($category_meta['category_image']) && !empty($category_meta['category_image'][0])) {
            $image_url = esc_url($category_meta['category_image'][0]);
        } elseif (isset($category_meta['featured_image']) && !empty($category_meta['featured_image'][0])) {
            $image_id = absint($category_meta['featured_image'][0]);
        } elseif (isset($category_meta['image']) && !empty($category_meta['image'][0])) {
            if (is_numeric($category_meta['image'][0])) {
                $image_id = absint($category_meta['image'][0]);
            } else {
                $image_url = esc_url($category_meta['image'][0]);
            }
        } elseif (isset($category_meta['thumbnail_id']) && !empty($category_meta['thumbnail_id'][0])) {
            $image_id = absint($category_meta['thumbnail_id'][0]);
        }
        
        // If we have an image ID, get the URLs
        if ($image_id && wp_attachment_is_image($image_id)) {
            $image_data = array(
                'id' => $image_id,
                'url' => wp_get_attachment_url($image_id),
                'full' => wp_get_attachment_image_url($image_id, 'full'),
                'medium' => wp_get_attachment_image_url($image_id, 'medium'),
                'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail')
            );
        } elseif ($image_url && filter_var($image_url, FILTER_VALIDATE_URL)) {
            $image_data = array(
                'id' => 0,
                'url' => $image_url,
                'full' => $image_url,
                'medium' => $image_url,
                'thumbnail' => $image_url
            );
        }
        
        $formatted_categories[] = array(
            'id' => $category->term_id,
            'name' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description ?: '',
            'count' => $category->count,
            'parent' => $category->parent,
            'url' => "/categories/{$category->slug}",
            'products_url' => "/products?taxonomy={$taxonomy}&product_cat={$category->slug}",
            'image' => $image_data
        );
    }
    
    return rest_ensure_response(array(
        'success' => true,
        'categories' => $formatted_categories,
        'total' => count($formatted_categories),
        'taxonomy' => $taxonomy
    ));
}

// SINGLE CATEGORY ENDPOINT
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/categories/(?P<slug>[a-zA-Z0-9_-]+)', array(
        'methods'  => 'GET',
        'callback' => 'get_single_category',
        'permission_callback' => '__return_true',
        'args' => array(
            'slug' => array(
                'validate_callback' => function($param) {
                    return !empty($param);
                }
            ),
        ),
    ));
});

function get_single_category($request) {
    $category_slug = sanitize_text_field($request['slug']);
    $taxonomy = $request->get_param('taxonomy') ?: 'equipment-buy';
    
    // Get category term
    $category = get_term_by('slug', $category_slug, 'product_cat');
    
    if (!$category || is_wp_error($category)) {
        return new WP_Error('category_not_found', 'Category not found', array('status' => 404));
    }
    
    // Get products for this category in the specified taxonomy
    $product_args = array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'fields' => 'ids',
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => $taxonomy,
                'operator' => 'EXISTS'
            ),
            array(
                'taxonomy' => 'product_cat',
                'field' => 'slug',
                'terms' => $category_slug
            )
        )
    );
    
    $product_ids = get_posts($product_args);
    $product_count = count($product_ids);
    
    // Get category metadata
    $category_meta = get_term_meta($category->term_id);
    
    // Get category image similar to above
    $image_data = null;
    $image_id = '';
    $image_url = '';
    
    if (isset($category_meta['category_image']) && !empty($category_meta['category_image'][0])) {
        $image_url = esc_url($category_meta['category_image'][0]);
    } elseif (isset($category_meta['featured_image']) && !empty($category_meta['featured_image'][0])) {
        $image_id = absint($category_meta['featured_image'][0]);
    } elseif (isset($category_meta['image']) && !empty($category_meta['image'][0])) {
        if (is_numeric($category_meta['image'][0])) {
            $image_id = absint($category_meta['image'][0]);
        } else {
            $image_url = esc_url($category_meta['image'][0]);
        }
    }
    
    if ($image_id && wp_attachment_is_image($image_id)) {
        $image_data = array(
            'id' => $image_id,
            'url' => wp_get_attachment_url($image_id),
            'full' => wp_get_attachment_image_url($image_id, 'full'),
            'medium' => wp_get_attachment_image_url($image_id, 'medium'),
            'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail')
        );
    } elseif ($image_url && filter_var($image_url, FILTER_VALIDATE_URL)) {
        $image_data = array(
            'id' => 0,
            'url' => $image_url,
            'full' => $image_url,
            'medium' => $image_url,
            'thumbnail' => $image_url
        );
    }

    return rest_ensure_response(array(
        'id' => $category->term_id,
        'name' => $category->name,
        'slug' => $category->slug,
        'description' => $category->description ?: '',
        'count' => $product_count,
        'parent' => $category->parent,
        'products_url' => "/products?taxonomy={$taxonomy}&product_cat={$category_slug}",
        'image' => $image_data,
        'product_ids' => array_slice($product_ids, 0, 12) // Return first 12 product IDs
    ));
}

// CATEGORY ADMIN FIELDS - Add custom fields for category image upload
add_action('product_cat_add_form_fields', 'add_category_image_field');
add_action('product_cat_edit_form_fields', 'edit_category_image_field');

function add_category_image_field() {
    ?>
    <div class="form-field">
        <label for="category_image">Category Image</label>
        <input type="text" name="category_image" id="category_image" value="" />
        <input type="button" class="button" id="category_image_upload" value="Upload Image" />
        <p class="description">Upload or enter URL for category image</p>
    </div>
    <div class="form-field">
        <label for="featured_image">Featured Image (Media Library)</label>
        <input type="hidden" name="featured_image" id="featured_image" value="" />
        <input type="button" class="button" id="featured_image_upload" value="Select from Media Library" />
        <div id="featured_image_preview"></div>
        <p class="description">Select image from WordPress media library</p>
    </div>
    <script>
    jQuery(document).ready(function($) {
        // Category image URL upload
        $('#category_image_upload').click(function(e) {
            e.preventDefault();
            var image = wp.media({ 
                title: 'Upload Category Image',
                multiple: false
            }).open().on('select', function() {
                var uploaded_image = image.state().get('selection').first();
                var image_url = uploaded_image.toJSON().url;
                $('#category_image').val(image_url);
            });
        });
        
        // Featured image from media library
        $('#featured_image_upload').click(function(e) {
            e.preventDefault();
            var image = wp.media({ 
                title: 'Select Category Featured Image',
                multiple: false
            }).open().on('select', function() {
                var uploaded_image = image.state().get('selection').first();
                var image_data = uploaded_image.toJSON();
                $('#featured_image').val(image_data.id);
                $('#featured_image_preview').html('<img src="' + image_data.url + '" style="max-width: 150px; height: auto; margin-top: 10px;" />');
            });
        });
    });
    </script>
    <?php
}

function edit_category_image_field($term) {
    $category_image = get_term_meta($term->term_id, 'category_image', true);
    $featured_image = get_term_meta($term->term_id, 'featured_image', true);
    ?>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="category_image">Category Image URL</label></th>
        <td>
            <input type="text" name="category_image" id="category_image" value="<?php echo esc_attr($category_image); ?>" style="width: 100%;" />
            <input type="button" class="button" id="category_image_upload" value="Upload Image" />
            <p class="description">Upload or enter URL for category image</p>
            <?php if($category_image): ?>
                <br><img src="<?php echo esc_url($category_image); ?>" style="max-width: 150px; height: auto; margin-top: 10px;" />
            <?php endif; ?>
        </td>
    </tr>
    <tr class="form-field">
        <th scope="row" valign="top"><label for="featured_image">Featured Image</label></th>
        <td>
            <input type="hidden" name="featured_image" id="featured_image" value="<?php echo esc_attr($featured_image); ?>" />
            <input type="button" class="button" id="featured_image_upload" value="<?php echo $featured_image ? 'Change Image' : 'Select from Media Library'; ?>" />
            <div id="featured_image_preview">
                <?php if($featured_image): 
                    $image_url = wp_get_attachment_image_url($featured_image, 'medium');
                    if($image_url): ?>
                        <img src="<?php echo esc_url($image_url); ?>" style="max-width: 150px; height: auto; margin-top: 10px;" />
                    <?php endif; 
                endif; ?>
            </div>
            <p class="description">Select image from WordPress media library (recommended)</p>
        </td>
    </tr>
    <script>
    jQuery(document).ready(function($) {
        // Category image URL upload
        $('#category_image_upload').click(function(e) {
            e.preventDefault();
            var image = wp.media({ 
                title: 'Upload Category Image',
                multiple: false
            }).open().on('select', function() {
                var uploaded_image = image.state().get('selection').first();
                var image_url = uploaded_image.toJSON().url;
                $('#category_image').val(image_url);
            });
        });
        
        // Featured image from media library
        $('#featured_image_upload').click(function(e) {
            e.preventDefault();
            var image = wp.media({ 
                title: 'Select Category Featured Image',
                multiple: false
            }).open().on('select', function() {
                var uploaded_image = image.state().get('selection').first();
                var image_data = uploaded_image.toJSON();
                $('#featured_image').val(image_data.id);
                $('#featured_image_preview').html('<img src="' + image_data.url + '" style="max-width: 150px; height: auto; margin-top: 10px;" />');
            });
        });
    });
    </script>
    <?php
}

// Save category image fields
add_action('created_product_cat', 'save_category_image_field');
add_action('edited_product_cat', 'save_category_image_field');

function save_category_image_field($term_id) {
    // Save category image URL
    if (isset($_POST['category_image']) && !empty($_POST['category_image'])) {
        $image_url = sanitize_url($_POST['category_image']);
        if (filter_var($image_url, FILTER_VALIDATE_URL)) {
            update_term_meta($term_id, 'category_image', $image_url);
            // Also save as 'image' for backward compatibility
            update_term_meta($term_id, 'image', $image_url);
        }
    } else {
        // Clear the image URL if empty
        delete_term_meta($term_id, 'category_image');
    }
    
    // Save featured image ID
    if (isset($_POST['featured_image']) && !empty($_POST['featured_image'])) {
        $image_id = absint($_POST['featured_image']);
        if ($image_id > 0 && wp_attachment_is_image($image_id)) {
            update_term_meta($term_id, 'featured_image', $image_id);
            // Also save as alternative keys for compatibility
            update_term_meta($term_id, 'thumbnail_id', $image_id);
        }
    } else {
        // Clear the featured image if empty
        delete_term_meta($term_id, 'featured_image');
        delete_term_meta($term_id, 'thumbnail_id');
    }
}

// Add sample category images endpoint
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/add-category-images', array(
        'methods'  => 'POST',
        'callback' => 'add_sample_category_images',
        'permission_callback' => '__return_true',
    ));
});

function add_sample_category_images($request) {
    // Sample category images - you can replace these with actual image URLs
    $sample_images = array(
        'forklifts' => 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400',
        'excavators' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
        'cranes' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400',
        'loaders' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400',
        'bulldozers' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400',
        'backhoe' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400'
    );
    
    $updated_categories = array();
    
    foreach ($sample_images as $category_slug => $image_url) {
        $category = get_term_by('slug', $category_slug, 'product_cat');
        if ($category) {
            update_term_meta($category->term_id, 'category_image', $image_url);
            update_term_meta($category->term_id, 'image', $image_url);
            $updated_categories[] = array(
                'category' => $category->name,
                'slug' => $category_slug,
                'image_added' => $image_url
            );
        }
    }
    
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Category images added',
        'updated_categories' => $updated_categories
    ));
}

// CUSTOM TAXONOMY IMAGE FUNCTIONALITY FOR CPT UI CREATED TAXONOMIES
// This will work for equipment-buy, equipment-rent and other custom taxonomies

// Generic function to add image fields to any taxonomy
function add_custom_taxonomy_image_fields($taxonomy_name) {
    add_action($taxonomy_name . '_add_form_fields', function() use ($taxonomy_name) {
        ?>
        <div class="form-field">
            <label for="taxonomy_image">Taxonomy Image URL</label>
            <input type="text" name="taxonomy_image" id="taxonomy_image" value="" style="width: 100%;" />
            <input type="button" class="button" id="taxonomy_image_upload" value="Upload Image" />
            <p class="description">Upload or enter URL for taxonomy image</p>
        </div>
        <div class="form-field">
            <label for="featured_image">Featured Image (Media Library)</label>
            <input type="hidden" name="featured_image" id="featured_image" value="" />
            <input type="button" class="button" id="featured_image_upload" value="Select from Media Library" />
            <div id="featured_image_preview"></div>
            <p class="description">Select image from WordPress media library (recommended)</p>
        </div>
        <script>
        jQuery(document).ready(function($) {
            // Taxonomy image URL upload
            $('#taxonomy_image_upload').click(function(e) {
                e.preventDefault();
                var image = wp.media({ 
                    title: 'Upload Taxonomy Image',
                    multiple: false
                }).open().on('select', function() {
                    var uploaded_image = image.state().get('selection').first();
                    var image_url = uploaded_image.toJSON().url;
                    $('#taxonomy_image').val(image_url);
                });
            });
            
            // Featured image from media library
            $('#featured_image_upload').click(function(e) {
                e.preventDefault();
                var image = wp.media({ 
                    title: 'Select Featured Image',
                    multiple: false
                }).open().on('select', function() {
                    var uploaded_image = image.state().get('selection').first();
                    var image_data = uploaded_image.toJSON();
                    $('#featured_image').val(image_data.id);
                    $('#featured_image_preview').html('<img src="' + image_data.url + '" style="max-width: 150px; height: auto; margin-top: 10px;" />');
                });
            });
        });
        </script>
        <?php
    });
    
    add_action($taxonomy_name . '_edit_form_fields', function($term) use ($taxonomy_name) {
        $taxonomy_image = get_term_meta($term->term_id, 'taxonomy_image', true);
        $featured_image = get_term_meta($term->term_id, 'featured_image', true);
        ?>
        <tr class="form-field">
            <th scope="row" valign="top"><label for="taxonomy_image">Taxonomy Image URL</label></th>
            <td>
                <input type="text" name="taxonomy_image" id="taxonomy_image" value="<?php echo esc_attr($taxonomy_image); ?>" style="width: 100%;" />
                <input type="button" class="button" id="taxonomy_image_upload" value="Upload Image" />
                <p class="description">Upload or enter URL for taxonomy image</p>
                <?php if($taxonomy_image): ?>
                    <br><img src="<?php echo esc_url($taxonomy_image); ?>" style="max-width: 150px; height: auto; margin-top: 10px;" />
                <?php endif; ?>
            </td>
        </tr>
        <tr class="form-field">
            <th scope="row" valign="top"><label for="featured_image">Featured Image</label></th>
            <td>
                <input type="hidden" name="featured_image" id="featured_image" value="<?php echo esc_attr($featured_image); ?>" />
                <input type="button" class="button" id="featured_image_upload" value="<?php echo $featured_image ? 'Change Image' : 'Select from Media Library'; ?>" />
                <div id="featured_image_preview">
                    <?php if($featured_image): 
                        $image_url = wp_get_attachment_image_url($featured_image, 'medium');
                        if($image_url): ?>
                            <img src="<?php echo esc_url($image_url); ?>" style="max-width: 150px; height: auto; margin-top: 10px;" />
                        <?php endif; 
                    endif; ?>
                </div>
                <p class="description">Select image from WordPress media library (recommended)</p>
            </td>
        </tr>
        <script>
        jQuery(document).ready(function($) {
            // Taxonomy image URL upload
            $('#taxonomy_image_upload').click(function(e) {
                e.preventDefault();
                var image = wp.media({ 
                    title: 'Upload Taxonomy Image',
                    multiple: false
                }).open().on('select', function() {
                    var uploaded_image = image.state().get('selection').first();
                    var image_url = uploaded_image.toJSON().url;
                    $('#taxonomy_image').val(image_url);
                });
            });
            
            // Featured image from media library
            $('#featured_image_upload').click(function(e) {
                e.preventDefault();
                var image = wp.media({ 
                    title: 'Select Featured Image',
                    multiple: false
                }).open().on('select', function() {
                    var uploaded_image = image.state().get('selection').first();
                    var image_data = uploaded_image.toJSON();
                    $('#featured_image').val(image_data.id);
                    $('#featured_image_preview').html('<img src="' + image_data.url + '" style="max-width: 150px; height: auto; margin-top: 10px;" />');
                });
            });
        });
        </script>
        <?php
    });
    
    // Save taxonomy image fields
    add_action('created_' . $taxonomy_name, 'save_custom_taxonomy_image_field');
    add_action('edited_' . $taxonomy_name, 'save_custom_taxonomy_image_field');
}

function save_custom_taxonomy_image_field($term_id) {
    // Save taxonomy image URL
    if (isset($_POST['taxonomy_image']) && !empty($_POST['taxonomy_image'])) {
        $image_url = sanitize_url($_POST['taxonomy_image']);
        if (filter_var($image_url, FILTER_VALIDATE_URL)) {
            update_term_meta($term_id, 'taxonomy_image', $image_url);
            // Also save as 'image' for backward compatibility
            update_term_meta($term_id, 'image', $image_url);
        }
    } else {
        // Clear the image URL if empty
        delete_term_meta($term_id, 'taxonomy_image');
    }
    
    // Save featured image ID
    if (isset($_POST['featured_image']) && !empty($_POST['featured_image'])) {
        $image_id = absint($_POST['featured_image']);
        if ($image_id > 0 && wp_attachment_is_image($image_id)) {
            update_term_meta($term_id, 'featured_image', $image_id);
            // Also save as alternative keys for compatibility
            update_term_meta($term_id, 'thumbnail_id', $image_id);
        }
    } else {
        // Clear the featured image if empty
        delete_term_meta($term_id, 'featured_image');
        delete_term_meta($term_id, 'thumbnail_id');
    }
}

// Apply image functionality to your custom taxonomies
add_action('init', function() {
    // Add image fields for equipment taxonomies
    if (taxonomy_exists('equipment-buy')) {
        add_custom_taxonomy_image_fields('equipment-buy');
    }
    if (taxonomy_exists('equipment-rent')) {
        add_custom_taxonomy_image_fields('equipment-rent');
    }
    
    // You can add more custom taxonomies here if needed
    // add_custom_taxonomy_image_fields('your-custom-taxonomy');
}, 20);

// ENHANCED CUSTOM TAXONOMY CATEGORIES API WITH IMAGES
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/taxonomy-terms/(?P<taxonomy>[a-zA-Z0-9_-]+)', array(
        'methods'  => 'GET',
        'callback' => 'get_custom_taxonomy_terms_with_images',
        'permission_callback' => '__return_true',
        'args' => array(
            'taxonomy' => array(
                'validate_callback' => function($param) {
                    return !empty($param) && taxonomy_exists($param);
                }
            ),
        ),
    ));
});

function get_custom_taxonomy_terms_with_images($request) {
    $taxonomy = sanitize_text_field($request['taxonomy']);
    
    // Validate taxonomy exists
    if (!taxonomy_exists($taxonomy)) {
        return new WP_Error('invalid_taxonomy', 'Invalid taxonomy: ' . $taxonomy, array('status' => 400));
    }
    
    // Get all terms for this taxonomy
    $terms = get_terms(array(
        'taxonomy' => $taxonomy,
        'hide_empty' => false,
        'orderby' => 'name',
        'order' => 'ASC'
    ));
    
    if (is_wp_error($terms)) {
        return new WP_Error('terms_error', 'Failed to fetch terms', array('status' => 500));
    }
    
    $formatted_terms = array();
    
    foreach ($terms as $term) {
        // Get term metadata including image
        $term_meta = get_term_meta($term->term_id);
        
        // Try to get term image from various possible meta keys
        $image_data = null;
        $image_id = '';
        $image_url = '';
        
        // Check for different image meta keys
        if (isset($term_meta['taxonomy_image']) && !empty($term_meta['taxonomy_image'][0]) && filter_var($term_meta['taxonomy_image'][0], FILTER_VALIDATE_URL)) {
            $image_url = esc_url($term_meta['taxonomy_image'][0]);
        } elseif (isset($term_meta['featured_image']) && !empty($term_meta['featured_image'][0]) && is_numeric($term_meta['featured_image'][0])) {
            $image_id = absint($term_meta['featured_image'][0]);
        } elseif (isset($term_meta['image']) && !empty($term_meta['image'][0])) {
            if (is_numeric($term_meta['image'][0])) {
                $image_id = absint($term_meta['image'][0]);
            } elseif (filter_var($term_meta['image'][0], FILTER_VALIDATE_URL)) {
                $image_url = esc_url($term_meta['image'][0]);
            }
        } elseif (isset($term_meta['thumbnail_id']) && !empty($term_meta['thumbnail_id'][0]) && is_numeric($term_meta['thumbnail_id'][0])) {
            $image_id = absint($term_meta['thumbnail_id'][0]);
        }
        
        // If we have an image ID, get the URLs
        if ($image_id && wp_attachment_is_image($image_id)) {
            $image_data = array(
                'id' => $image_id,
                'url' => wp_get_attachment_url($image_id),
                'full' => wp_get_attachment_image_url($image_id, 'full'),
                'medium' => wp_get_attachment_image_url($image_id, 'medium'),
                'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail')
            );
        } elseif ($image_url) {
            $image_data = array(
                'id' => 0,
                'url' => $image_url,
                'full' => $image_url,
                'medium' => $image_url,
                'thumbnail' => $image_url
            );
        }
        
        $formatted_terms[] = array(
            'id' => $term->term_id,
            'name' => $term->name,
            'slug' => $term->slug,
            'description' => $term->description ?: '',
            'count' => $term->count,
            'parent' => $term->parent,
            'taxonomy' => $taxonomy,
            'url' => "/taxonomy-terms/{$taxonomy}/{$term->slug}",
            'products_url' => "/products?taxonomy={$taxonomy}&{$taxonomy}={$term->slug}",
            'image' => $image_data
        );
    }
    
    return rest_ensure_response(array(
        'success' => true,
        'terms' => $formatted_terms,
        'total' => count($formatted_terms),
        'taxonomy' => $taxonomy,
        'taxonomy_label' => get_taxonomy($taxonomy)->label ?? $taxonomy
    ));
}

// SINGLE CUSTOM TAXONOMY TERM ENDPOINT
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/taxonomy-terms/(?P<taxonomy>[a-zA-Z0-9_-]+)/(?P<slug>[a-zA-Z0-9_-]+)', array(
        'methods'  => 'GET',
        'callback' => 'get_single_custom_taxonomy_term',
        'permission_callback' => '__return_true',
        'args' => array(
            'taxonomy' => array(
                'validate_callback' => function($param) {
                    return !empty($param) && taxonomy_exists($param);
                }
            ),
            'slug' => array(
                'validate_callback' => function($param) {
                    return !empty($param);
                }
            ),
        ),
    ));
});

function get_single_custom_taxonomy_term($request) {
    $taxonomy = sanitize_text_field($request['taxonomy']);
    $term_slug = sanitize_text_field($request['slug']);
    
    // Get term
    $term = get_term_by('slug', $term_slug, $taxonomy);
    
    if (!$term || is_wp_error($term)) {
        return new WP_Error('term_not_found', 'Term not found', array('status' => 404));
    }
    
    // Get products for this term
    $product_args = array(
        'post_type' => 'product',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'fields' => 'ids',
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $term_slug
            )
        )
    );
    
    $product_ids = get_posts($product_args);
    $product_count = count($product_ids);
    
    // Get term metadata
    $term_meta = get_term_meta($term->term_id);
    
    // Get term image similar to above
    $image_data = null;
    $image_id = '';
    $image_url = '';
    
    if (isset($term_meta['taxonomy_image']) && !empty($term_meta['taxonomy_image'][0]) && filter_var($term_meta['taxonomy_image'][0], FILTER_VALIDATE_URL)) {
        $image_url = esc_url($term_meta['taxonomy_image'][0]);
    } elseif (isset($term_meta['featured_image']) && !empty($term_meta['featured_image'][0]) && is_numeric($term_meta['featured_image'][0])) {
        $image_id = absint($term_meta['featured_image'][0]);
    } elseif (isset($term_meta['image']) && !empty($term_meta['image'][0])) {
        if (is_numeric($term_meta['image'][0])) {
            $image_id = absint($term_meta['image'][0]);
        } elseif (filter_var($term_meta['image'][0], FILTER_VALIDATE_URL)) {
            $image_url = esc_url($term_meta['image'][0]);
        }
    }
    
    if ($image_id && wp_attachment_is_image($image_id)) {
        $image_data = array(
            'id' => $image_id,
            'url' => wp_get_attachment_url($image_id),
            'full' => wp_get_attachment_image_url($image_id, 'full'),
            'medium' => wp_get_attachment_image_url($image_id, 'medium'),
            'thumbnail' => wp_get_attachment_image_url($image_id, 'thumbnail')
        );
    } elseif ($image_url) {
        $image_data = array(
            'id' => 0,
            'url' => $image_url,
            'full' => $image_url,
            'medium' => $image_url,
            'thumbnail' => $image_url
        );
    }

    return rest_ensure_response(array(
        'id' => $term->term_id,
        'name' => $term->name,
        'slug' => $term->slug,
        'description' => $term->description ?: '',
        'count' => $product_count,
        'parent' => $term->parent,
        'taxonomy' => $taxonomy,
        'products_url' => "/products?taxonomy={$taxonomy}&{$taxonomy}={$term_slug}",
        'image' => $image_data,
        'product_ids' => array_slice($product_ids, 0, 12) // Return first 12 product IDs
    ));
}

// Helper endpoint to add sample images to custom taxonomy terms
add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/add-taxonomy-sample-images', array(
        'methods'  => 'POST',
        'callback' => 'add_sample_taxonomy_images',
        'permission_callback' => '__return_true',
    ));
});

function add_sample_taxonomy_images($request) {
    $taxonomy = $request->get_param('taxonomy') ?: 'equipment-buy';
    
    // Sample images for different equipment types
    $sample_images = array(
        'forklifts' => 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400',
        'excavators' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
        'cranes' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400',
        'loaders' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400',
        'bulldozers' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400',
        'backhoe' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400',
        'sales' => 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        'rentals' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    );
    
    $updated_terms = array();
    
    foreach ($sample_images as $term_slug => $image_url) {
        $term = get_term_by('slug', $term_slug, $taxonomy);
        if ($term) {
            update_term_meta($term->term_id, 'taxonomy_image', $image_url);
            update_term_meta($term->term_id, 'image', $image_url);
            $updated_terms[] = array(
                'term' => $term->name,
                'slug' => $term_slug,
                'taxonomy' => $taxonomy,
                'image_added' => $image_url
            );
        }
    }
    
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Taxonomy term images added',
        'taxonomy' => $taxonomy,
        'updated_terms' => $updated_terms
    ));
}

/**
   * Register custom REST API endpoint for enquiry submissions
   */
  add_action('rest_api_init', function () {
      register_rest_route('custom/v1', '/enquiries', array(
          'methods' => 'POST',
          'callback' => 'handle_enquiry_submission',
          'permission_callback' => '__return_true',
          'args' => array(
              'name' => array(
                  'required' => true,
                  'validate_callback' => function($param, $request, $key) {
                      return !empty(trim($param)) && strlen(trim($param)) >= 2;
                  },
                  'sanitize_callback' => 'sanitize_text_field',
              ),
              'email' => array(
                  'required' => true,
                  'validate_callback' => function($param, $request, $key) {
                      return is_email($param);
                  },
                  'sanitize_callback' => 'sanitize_email',
              ),
              'phone' => array(
                  'required' => true,
                  'validate_callback' => function($param, $request, $key) {
                      return !empty(trim($param));
                  },
                  'sanitize_callback' => 'sanitize_text_field',
              ),
              'interest' => array(
                  'required' => false,
                  'sanitize_callback' => 'sanitize_text_field',
                  'default' => 'Buying'
              ),
              'category' => array(
                  'required' => false,
                  'sanitize_callback' => 'sanitize_text_field',
                  'default' => ''
              ),
          ),
      ));
  });

  /**
   * Enhanced enquiry submission handler with better error handling and email debugging
   */
  function handle_enquiry_submission($request) {
      // Get parameters with proper sanitization
      $name = sanitize_text_field($request->get_param('name'));
      $email = sanitize_email($request->get_param('email'));
      $phone = sanitize_text_field($request->get_param('phone'));
      $interest = sanitize_text_field($request->get_param('interest')) ?: 'Buying';
      $category = sanitize_text_field($request->get_param('category')) ?: '';
      
      // Enhanced validation
      if (empty($name) || strlen($name) < 2) {
          return new WP_REST_Response(array(
              'success' => false,
              'message' => 'Name must be at least 2 characters long.'
          ), 400);
      }
      
      if (!is_email($email)) {
          return new WP_REST_Response(array(
              'success' => false,
              'message' => 'Please provide a valid email address.'
          ), 400);
      }
      
      if (empty($phone)) {
          return new WP_REST_Response(array(
              'success' => false,
              'message' => 'Phone number is required.'
          ), 400);
      }
      
      // Log the submission attempt for debugging
      error_log("Enquiry submission: Name: $name, Email: $email, Phone: $phone, Category: $category");
      
      try {
          // Ensure enquiry post type exists
          if (!post_type_exists('enquiry')) {
              register_post_type('enquiry', array(
                  'labels' => array(
                      'name' => 'Enquiries',
                      'singular_name' => 'Enquiry'
                  ),
                  'public' => false,
                  'show_ui' => true,
                  'menu_icon' => 'dashicons-email-alt',
                  'supports' => array('title', 'editor', 'custom-fields'),
              ));
          }
          
          // Save enquiry to database with enhanced metadata
          $post_data = array(
              'post_title'    => "Enquiry from $name - " . date('Y-m-d H:i:s'),
              'post_content'  => "Name: $name\nEmail: $email\nPhone: $phone\nInterest: $interest\nCategory: $category\nSubmitted: " . date('Y-m-d H:i:s'),
              'post_status'   => 'private',
              'post_type'     => 'enquiry',
              'meta_input'    => array(
                  'enquiry_name' => $name,
                  'enquiry_email' => $email,
                  'enquiry_phone' => $phone,
                  'enquiry_interest' => $interest,
                  'enquiry_category' => $category,
                  'enquiry_date' => current_time('mysql'),
                  'enquiry_ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
              )
          );
          
          $post_id = wp_insert_post($post_data);
          
          if (is_wp_error($post_id)) {
              error_log("Failed to save enquiry: " . $post_id->get_error_message());
              throw new Exception('Failed to save enquiry to database');
          }
          
          error_log("Enquiry saved with ID: $post_id");
          
          // Enhanced email sending with better headers and error handling
          $admin_email = get_option('admin_email');
          $site_name = get_bloginfo('name');
          $subject = "New Equipment Enquiry from $name - $site_name";
          
          $message = "You have received a new enquiry:\n\n";
          $message .= "Name: $name\n";
          $message .= "Email: $email\n";
          $message .= "Phone: $phone\n";
          $message .= "Interest: $interest\n";
          $message .= "Category: " . ($category ?: 'Not specified') . "\n";
          $message .= "Date: " . date('Y-m-d H:i:s') . "\n\n";
          $message .= "Reply to this enquiry at: $email\n";
          $message .= "Enquiry ID: $post_id";
          
          // Set proper email headers
          $headers = array(
              'Content-Type: text/plain; charset=UTF-8',
              "From: $site_name <$admin_email>",
              "Reply-To: $name <$email>"
          );
          
          // Attempt to send email with error handling
          error_log("Sending email to: $admin_email");
          $email_sent = wp_mail($admin_email, $subject, $message, $headers);
          
          if (!$email_sent) {
              error_log("wp_mail failed, trying alternative method");
              // Fallback: try with basic PHP mail
              $basic_headers = "From: $admin_email\r\nReply-To: $email\r\n";
              $email_sent = mail($admin_email, $subject, $message, $basic_headers);
              
              if (!$email_sent) {
                  error_log("All email methods failed for enquiry ID: $post_id");
              } else {
                  error_log("Email sent using PHP mail() function");
              }
          } else {
              error_log("Email sent successfully using wp_mail");
          }
          
          // Send confirmation email to customer
          if ($email_sent) {
              $customer_subject = "Thank you for your enquiry - $site_name";
              $customer_message = "Dear $name,\n\n";
              $customer_message .= "Thank you for your interest in our equipment.\n\n";
              $customer_message .= "We have received your enquiry and will respond within 1 hour during business hours.\n\n";
              $customer_message .= "Your enquiry details:\n";
              $customer_message .= "Interest: $interest\n";
              $customer_message .= "Category: " . ($category ?: 'Not specified') . "\n";
              $customer_message .= "Phone: $phone\n\n";
              $customer_message .= "Best regards,\n$site_name Team";
              
              wp_mail($email, $customer_subject, $customer_message, array("From: $site_name <$admin_email>"));
          }

          return new WP_REST_Response(array(
              'success' => true,
              'message' => 'Thank you for your enquiry! We\'ll get back to you within 1 hour.',
              'id' => $post_id,
              'email_sent' => $email_sent
          ), 200);

      } catch (Exception $e) {
          error_log("Enquiry submission error: " . $e->getMessage());
          return new WP_REST_Response(array(
              'success' => false,
              'message' => 'There was an error processing your enquiry. Please try again or contact us directly.',
              'debug_info' => $e->getMessage()
          ), 500);
      }
  }

  /**
   * Register custom post type for enquiries
   */
  add_action('init', function() {
      register_post_type('enquiry', array(
          'labels' => array(
              'name' => 'Enquiries',
              'singular_name' => 'Enquiry'
          ),
          'public' => false,
          'show_ui' => true,
          'menu_icon' => 'dashicons-email-alt',
          'supports' => array('title', 'editor', 'custom-fields'),
      ));
  });
  /**
   * Email test endpoint for debugging
   */
  add_action('rest_api_init', function () {
      register_rest_route('custom/v1', '/test-email', array(
          'methods'  => 'GET',
          'callback' => 'test_email_functionality',
          'permission_callback' => '__return_true',
      ));
  });

  function test_email_functionality($request) {
      $admin_email = get_option('admin_email');
      $site_name = get_bloginfo('name');
      
      // Test basic wp_mail
      $test_subject = "Email Test from $site_name - " . date('Y-m-d H:i:s');
      $test_message = "This is a test email to verify email functionality.\n\nTimestamp: " . date('Y-m-d H:i:s');
      
      $wp_mail_result = wp_mail($admin_email, $test_subject, $test_message);
      
      // Test PHP mail function
      $php_mail_result = mail($admin_email, $test_subject . " (PHP mail)", $test_message);
      
      return new WP_REST_Response(array(
          'wp_mail_result' => $wp_mail_result,
          'php_mail_result' => $php_mail_result,
          'admin_email' => $admin_email,
          'site_name' => $site_name,
          'test_message' => 'Check your email for test messages',
          'server_info' => array(
              'php_version' => phpversion(),
              'wordpress_version' => get_bloginfo('version'),
              'mail_function_exists' => function_exists('mail'),
              'wp_mail_function_exists' => function_exists('wp_mail'),
              'server_name' => $_SERVER['SERVER_NAME'] ?? 'unknown'
          )
      ), 200);
  }

  /**
   * Add CORS headers for React app
   */

   add_action('rest_api_init', function() {
      remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
      add_filter('rest_pre_serve_request', function($served, $result, $request, $server) {
          header('Access-Control-Allow-Origin: *');
          header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
          header('Access-Control-Allow-Headers: Content-Type, Authorization');

          return $served;
      }, 10, 4);
  });

