<?php
/**
 * IMPROVED ENQUIRY HANDLER - Enhanced version with better email handling
 * 
 * This file contains an improved version of the enquiry submission handler
 * with better error handling, email debugging, and fallback options.
 */

/**
 * Enhanced enquiry submission handler
 */
function handle_enquiry_submission_improved($request) {
    // Get parameters
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
    
    // Log the submission attempt
    error_log("Enquiry submission attempt: Name: $name, Email: $email, Phone: $phone, Category: $category");
    
    try {
        // Ensure enquiry post type exists
        if (!post_type_exists('enquiry')) {
            // Register the post type on the fly if it doesn't exist
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
        
        // Save enquiry to database
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
                'enquiry_ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                'enquiry_user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
            )
        );
        
        $post_id = wp_insert_post($post_data);
        
        if (is_wp_error($post_id)) {
            error_log("Failed to save enquiry to database: " . $post_id->get_error_message());
            throw new Exception('Failed to save enquiry');
        }
        
        error_log("Enquiry saved to database with ID: $post_id");
        
        // Prepare email content
        $admin_email = get_option('admin_email');
        $site_name = get_bloginfo('name');
        $subject = "New Equipment Enquiry from $name - $site_name";
        
        $message = "You have received a new enquiry from your website.\n\n";
        $message .= "Details:\n";
        $message .= "--------\n";
        $message .= "Name: $name\n";
        $message .= "Email: $email\n";
        $message .= "Phone: $phone\n";
        $message .= "Interest: $interest\n";
        $message .= "Category: " . ($category ?: 'Not specified') . "\n";
        $message .= "Date: " . date('Y-m-d H:i:s') . "\n";
        $message .= "IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n\n";
        $message .= "You can respond to this enquiry by replying to $email\n\n";
        $message .= "This enquiry has been saved in your WordPress admin under Enquiries (ID: $post_id)";
        
        // Set up email headers for better deliverability
        $headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            "From: $site_name <$admin_email>",
            "Reply-To: $name <$email>",
            'X-Priority: 1',
            'X-MSMail-Priority: High'
        );
        
        // Attempt to send email
        error_log("Attempting to send email to: $admin_email");
        $email_sent = wp_mail($admin_email, $subject, $message, $headers);
        
        if (!$email_sent) {
            error_log("Failed to send email notification for enquiry ID: $post_id");
            
            // Try alternative email sending methods
            $alternative_sent = false;
            
            // Method 1: Try with basic headers
            if (!$alternative_sent) {
                $basic_headers = "From: $admin_email\r\nReply-To: $email\r\n";
                $alternative_sent = mail($admin_email, $subject, $message, $basic_headers);
                if ($alternative_sent) {
                    error_log("Email sent using PHP mail() function");
                }
            }
            
            // Method 2: Try with no custom headers
            if (!$alternative_sent) {
                $alternative_sent = wp_mail($admin_email, $subject, $message);
                if ($alternative_sent) {
                    error_log("Email sent using wp_mail() without custom headers");
                }
            }
            
            if (!$alternative_sent) {
                error_log("All email sending methods failed for enquiry ID: $post_id");
                // Don't fail the request - enquiry is still saved
            }
        } else {
            error_log("Email notification sent successfully for enquiry ID: $post_id");
        }
        
        // Send auto-response to customer (optional)
        $customer_subject = "Thank you for your enquiry - $site_name";
        $customer_message = "Dear $name,\n\n";
        $customer_message .= "Thank you for your enquiry about equipment $interest.\n\n";
        $customer_message .= "We have received your message and will respond within 1 hour during business hours.\n\n";
        $customer_message .= "Your enquiry details:\n";
        $customer_message .= "Interest: $interest\n";
        $customer_message .= "Category: " . ($category ?: 'Not specified') . "\n";
        $customer_message .= "Phone: $phone\n\n";
        $customer_message .= "Best regards,\n";
        $customer_message .= "$site_name Team";
        
        $customer_headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            "From: $site_name <$admin_email>"
        );
        
        wp_mail($email, $customer_subject, $customer_message, $customer_headers);
        
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Thank you for your enquiry! We\'ll get back to you within 1 hour.',
            'id' => $post_id,
            'email_sent' => $email_sent || $alternative_sent
        ), 200);
        
    } catch (Exception $e) {
        error_log("Enquiry submission error: " . $e->getMessage());
        
        return new WP_REST_Response(array(
            'success' => false,
            'message' => 'There was an error processing your enquiry. Please try again or contact us directly.',
            'error' => $e->getMessage()
        ), 500);
    }
}

/**
 * Add debugging endpoint to test email functionality
 */
function test_email_functionality($request) {
    $admin_email = get_option('admin_email');
    $site_name = get_bloginfo('name');
    
    // Test basic wp_mail
    $test_subject = "Email Test from $site_name";
    $test_message = "This is a test email to verify email functionality.\n\nTimestamp: " . date('Y-m-d H:i:s');
    
    $wp_mail_result = wp_mail($admin_email, $test_subject, $test_message);
    
    // Test PHP mail function
    $php_mail_result = mail($admin_email, $test_subject . " (PHP mail)", $test_message);
    
    return new WP_REST_Response(array(
        'wp_mail_result' => $wp_mail_result,
        'php_mail_result' => $php_mail_result,
        'admin_email' => $admin_email,
        'site_name' => $site_name,
        'server_info' => array(
            'php_version' => phpversion(),
            'wordpress_version' => get_bloginfo('version'),
            'mail_function_exists' => function_exists('mail'),
            'wp_mail_function_exists' => function_exists('wp_mail')
        )
    ), 200);
}

/**
 * Register improved endpoints
 */
function register_improved_enquiry_endpoints() {
    // Improved enquiry endpoint
    register_rest_route('custom/v1', '/enquiries', array(
        'methods' => 'POST',
        'callback' => 'handle_enquiry_submission_improved',
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
    
    // Email test endpoint
    register_rest_route('custom/v1', '/test-email', array(
        'methods' => 'GET',
        'callback' => 'test_email_functionality',
        'permission_callback' => '__return_true',
    ));
}

// Hook to register the endpoints
add_action('rest_api_init', 'register_improved_enquiry_endpoints');

?>