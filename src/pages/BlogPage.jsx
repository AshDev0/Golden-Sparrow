/**
 * BlogPage Component
 * Lists all blog posts with pagination and search
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Package,
  Filter
} from 'lucide-react';
import { fetchBlogPosts } from '../services/api';
import { debugLog } from '../constants/config';

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          page: currentPage,
          per_page: 9,
          orderby: 'date',
          order: 'desc'
        };
        
        if (searchTerm) {
          params.search = searchTerm;
        }
        
        const data = await fetchBlogPosts(params);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        
      } catch (err) {
        debugLog('Error loading blog posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Error Loading Blog</h1>
          <p className="text-neutral-600 mb-6">There was an error loading the blog posts. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - Latest Equipment News & Insights | Golden Sparrow</title>
        <meta name="description" content="Stay updated with the latest industry trends, equipment insights, and news in the construction and industrial equipment sector." />
        <meta property="og:title" content="Blog - Golden Sparrow Equipment" />
        <meta property="og:description" content="Latest equipment news, insights, and industry trends." />
      </Helmet>

      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                Equipment News & Insights
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Stay updated with the latest industry trends, equipment reviews, and expert insights
              </p>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full px-4 py-3 pl-12 pr-16 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-accent-600 text-white rounded-lg text-sm hover:bg-accent-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-soft overflow-hidden"
                  >
                    <div className="h-48 bg-neutral-200 animate-pulse"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-3 bg-neutral-200 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      {/* Featured Image */}
                      <div className="relative h-48 bg-neutral-200 overflow-hidden">
                        {post.featuredImage ? (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                            <Package className="w-12 h-12 text-neutral-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Date */}
                        <div className="flex items-center text-sm text-neutral-500 mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <div 
                          className="text-neutral-600 text-sm line-clamp-3 mb-4"
                          dangerouslySetInnerHTML={{ 
                            __html: post.excerpt.replace(/<[^>]*>/g, '').slice(0, 150) + '...' 
                          }}
                        />

                        {/* Read More */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center text-sm text-accent-600 font-medium">
                            Read More
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="flex items-center text-xs text-neutral-400">
                            <Clock className="w-3 h-3 mr-1" />
                            5 min read
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-16 space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="flex items-center px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </button>

                    <div className="flex space-x-1">
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        const isCurrentPage = page === currentPage;
                        
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg transition-colors ${ 
                              isCurrentPage
                                ? 'bg-accent-600 text-white'
                                : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="flex items-center px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {searchTerm ? 'No articles found' : 'No blog posts available'}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {searchTerm 
                    ? `No articles match your search for "${searchTerm}". Try different keywords.`
                    : 'Blog posts will appear here once they are published.'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSearchParams(new URLSearchParams());
                    }}
                    className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}