import React from 'react';
import Header from '@/components/layout/Header';
import UserCard from '@/components/common/UserCard';
import { ApiUser, User } from '../interfaces';

// This function runs at build time on the server
export async function getStaticProps() {
  try {
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

    return {
      props: {
        users: formattedUsers
      },
      // Re-generate the page at most once every 10 seconds
      revalidate: 10
    };
  } catch (error) {
    return {
      props: {
        users: [],
        error: 'Failed to fetch users from API'
      }
    };
  }
}

// The component now receives data as props from getStaticProps
interface UsersPageProps {
  users: User[];
  error?: string;
}

export default function UsersPage({ users, error }: UsersPageProps) {
  // No more useState or useEffect for data fetching!
  // The data is already available as props from getStaticProps

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
              Meet our amazing users! All data is pre-fetched at build time using getStaticProps.
            </p>
            
            {/* API Status */}
            <div className="mt-4 flex justify-center items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-600">
                {error ? 'Error loading users' : `${users.length} users loaded`}
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
                <p className="text-sm text-gray-500">
                  This error occurred during build time. Please try rebuilding the application.
                </p>
              </div>
            </div>
          )}

          {/* Users Grid */}
          {!error && (
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
                🌐 Static Generation with getStaticProps
              </h3>
              <p className="text-gray-600 mb-2">
                This page uses <strong>getStaticProps</strong> to fetch user data at build time. 
                All user information is pre-rendered on the server for optimal performance.
              </p>
              <div className="text-sm text-gray-500">
                <strong>Data fetching method:</strong> Static Generation (SSG)
                <br />
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