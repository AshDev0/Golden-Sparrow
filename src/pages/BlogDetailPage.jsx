/**
 * BlogDetailPage Component
 * Displays individual blog post with full content
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2,
  ChevronRight,
  Package
} from 'lucide-react';
import { fetchBlogPost, fetchBlogPosts } from '../services/api';
import { debugLog } from '../constants/config';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the main post
        const postData = await fetchBlogPost(slug);
        setPost(postData);
        
        // Fetch related posts
        const relatedData = await fetchBlogPosts({
          per_page: 3,
          orderby: 'date',
          order: 'desc'
        });
        
        // Filter out current post from related posts
        const filtered = relatedData.posts.filter(p => p.slug !== slug);
        setRelatedPosts(filtered.slice(0, 3));
        
      } catch (err) {
        debugLog('Error loading blog post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadBlogPost();
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt.replace(/<[^>]*>/g, ''),
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        {/* Loading Skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-4 bg-neutral-200 rounded w-24 animate-pulse mb-4"></div>
            <div className="h-8 bg-neutral-200 rounded w-3/4 animate-pulse mb-4"></div>
            <div className="h-4 bg-neutral-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="h-96 bg-neutral-200 rounded-xl animate-pulse mb-8"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-neutral-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {error.includes('404') ? 'Blog Post Not Found' : 'Error Loading Post'}
          </h1>
          <p className="text-neutral-600 mb-6">
            {error.includes('404') 
              ? 'The blog post you are looking for could not be found.' 
              : 'There was an error loading the blog post. Please try again.'}
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{post.seo?.title || post.title}</title>
        <meta name="description" content={post.seo?.description || post.excerpt.replace(/<[^>]*>/g, '').slice(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt.replace(/<[^>]*>/g, '').slice(0, 160)} />
        <meta property="og:type" content="article" />
        {post.featuredImage && <meta property="og:image" content={post.featuredImage} />}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.modified} />
      </Helmet>

      <div className="min-h-screen bg-neutral-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-neutral-600 hover:text-neutral-900">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <Link to="/blog" className="text-neutral-600 hover:text-neutral-900">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-900 truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </button>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-neutral-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                5 min read
              </div>

              {post.author?.name && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author.name}
                </div>
              )}

              <button
                onClick={handleShare}
                className="flex items-center text-accent-600 hover:text-accent-700 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>

            {/* Categories */}
            {post.categories?.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <Tag className="w-4 h-4 text-neutral-400" />
                {post.categories.map((category, index) => (
                  <span
                    key={category.id || index}
                    className="inline-block px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm"
                  >
                    {category.name || category}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-soft">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-neutral prose-headings:font-display prose-headings:scroll-mt-24 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-soft prose-code:before:content-none prose-code:after:content-none prose-blockquote:border-accent-200 prose-blockquote:bg-neutral-50/50 prose-blockquote:not-italic"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={tag.id || index}
                    className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                  >
                    #{tag.name || tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white border-t border-neutral-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-8">
                Related Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-white rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1"
                    onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  >
                    <div className="relative h-48 bg-neutral-200 overflow-hidden">
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                          <Package className="w-12 h-12 text-neutral-400" />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-sm text-neutral-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(relatedPost.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>

                      <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                        {relatedPost.title}
                      </h3>

                      <div 
                        className="text-neutral-600 text-sm line-clamp-2 mb-4"
                        dangerouslySetInnerHTML={{ 
                          __html: relatedPost.excerpt.replace(/<[^>]*>/g, '').slice(0, 100) + '...' 
                        }}
                      />

                      <span className="inline-flex items-center text-sm text-accent-600 font-medium">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}