import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import PostCard from '@/components/common/PostCard';
import { ApiPost, ApiUser, Post } from '../interfaces';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from JSONPlaceholder API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch posts and users concurrently
      const [postsResponse, usersResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/users')
      ]);

      if (!postsResponse.ok || !usersResponse.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const postsData: ApiPost[] = await postsResponse.json();
      const usersData: ApiUser[] = await usersResponse.json();

      // Convert API posts to our Post format
      const formattedPosts: Post[] = postsData.map(post => ({
        id: post.id,
        title: post.title,
        content: post.body,
        userId: post.userId
      }));

      // Create users mapping object
      const usersMap: { [key: number]: string } = {};
      usersData.forEach(user => {
        usersMap[user.id] = user.name;
      });

      setPosts(formattedPosts.slice(0, 12)); // Limit to 12 posts for better performance
      setUsers(usersMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle retry
  const handleRetry = () => {
    fetchPosts();
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Posts from API
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real posts fetched from JSONPlaceholder API. Each post shows the author and content.
            </p>
            
            {/* API Status */}
            <div className="mt-4 flex justify-center items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : error ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-600">
                {loading ? 'Fetching posts...' : error ? 'Error loading posts' : `${posts.length} posts loaded`}
              </span>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Failed to Load Posts
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="ml-3">
                      <div className="h-3 bg-gray-300 rounded w-20 mb-1"></div>
                      <div className="h-2 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    userId={post.userId}
                    userName={users[post.userId] || `User ${post.userId}`}
                  />
                ))}
              </div>

              {/* Empty State */}
              {posts.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No Posts Available
                    </h3>
                    <p className="text-gray-600">
                      Check back later for new posts.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* API Information */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📡 API Integration
              </h3>
              <p className="text-gray-600 mb-2">
                This page fetches real data from <strong>JSONPlaceholder API</strong>, a free fake API for testing and prototyping.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Endpoints used:</strong>{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">https://jsonplaceholder.typicode.com/posts</code>{' '}
                and{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">https://jsonplaceholder.typicode.com/users</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}