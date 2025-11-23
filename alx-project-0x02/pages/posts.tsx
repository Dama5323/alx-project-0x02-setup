import React from 'react';
import Header from '@/components/layout/Header';
import PostCard from '@/components/common/PostCard';
import { ApiPost, ApiUser, Post } from '../interfaces';

// This function runs at build time on the server
export async function getStaticProps() {
  try {
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

    return {
      props: {
        posts: formattedPosts.slice(0, 12), // Limit to 12 posts
        users: usersMap
      },
      // Re-generate the page at most once every 10 seconds
      // if there are incoming requests (optional)
      revalidate: 10
    };
  } catch (error) {
    return {
      props: {
        posts: [],
        users: {},
        error: 'Failed to fetch posts from API'
      }
    };
  }
}

// The component now receives data as props from getStaticProps
interface PostsPageProps {
  posts: Post[];
  users: { [key: number]: string };
  error?: string;
}

export default function PostsPage({ posts, users, error }: PostsPageProps) {
  // No more useState or useEffect for data fetching!
  // The data is already available as props from getStaticProps

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
              Real posts fetched from JSONPlaceholder API using getStaticProps. Each post shows the author and content.
            </p>
            
            {/* API Status */}
            <div className="mt-4 flex justify-center items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-600">
                {error ? 'Error loading posts' : `${posts.length} posts loaded`}
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
                <p className="text-sm text-gray-500">
                  This error occurred during build time. Please try rebuilding the application.
                </p>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          {!error && (
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
                📡 Static Generation with getStaticProps
              </h3>
              <p className="text-gray-600 mb-2">
                This page uses <strong>getStaticProps</strong> to fetch data at build time. 
                The posts are pre-rendered on the server and served as static HTML.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Data fetching method:</strong> Static Generation (SSG)
                <br />
                <strong>API Endpoints:</strong>{' '}
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