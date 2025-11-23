import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import UserCard from '../components/common/UserCard';
import { ApiUser, User } from '../interfaces';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from JSONPlaceholder API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users data from API');
      }

      const usersData: ApiUser[] = await response.json();

      // Convert API users to our User format
      const formattedUsers: User[] = usersData.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode
        },
        company: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs
        }
      }));

      setUsers(formattedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle retry
  const handleRetry = () => {
    fetchUsers();
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Our Users
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our amazing users! All data is fetched in real-time from JSONPlaceholder API.
            </p>
            
            {/* API Status */}
            <div className="mt-4 flex justify-center items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : error ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-600">
                {loading ? 'Loading users...' : error ? 'Error loading users' : `${users.length} users loaded`}
              </span>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Failed to Load Users
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
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Users Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    website={user.website}
                    address={user.address}
                    company={user.company}
                  />
                ))}
              </div>

              {/* Empty State */}
              {users.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No Users Found
                    </h3>
                    <p className="text-gray-600">
                      There are no users to display at the moment.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* API Information */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🌐 Real API Data
              </h3>
              <p className="text-gray-600 mb-2">
                This page displays real user data fetched from <strong>JSONPlaceholder API</strong>. 
                Each user card shows complete information including contact details, address, and company information.
              </p>
              <div className="text-sm text-gray-500">
                <strong>API Endpoint:</strong>{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">https://jsonplaceholder.typicode.com/users</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}