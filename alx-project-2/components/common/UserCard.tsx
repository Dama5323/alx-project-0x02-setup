import React from 'react';
import { UserCardProps } from '../../interfaces';

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  phone,
  website,
  address,
  company,
  className = ''
}) => {
  // Generate consistent color based on user ID
  const getUserColor = (userId: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-yellow-500 to-yellow-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-red-500 to-red-600',
      'from-teal-500 to-teal-600',
      'from-orange-500 to-orange-600',
      'from-cyan-500 to-cyan-600'
    ];
    return colors[userId % colors.length];
  };

  // Format phone number
  const formatPhone = (phone: string) => {
    return phone.split(' ')[0]; // Just take the first part if there are extensions
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {/* User Header with Gradient */}
      <div className={`bg-gradient-to-r ${getUserColor(id)} p-6 text-white`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold truncate">{name}</h3>
          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-semibold">
            ID: {id}
          </span>
        </div>
        <p className="text-white text-opacity-90 text-sm truncate">{company.name}</p>
      </div>

      {/* User Details */}
      <div className="p-6">
        {/* Contact Information */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href={`mailto:${email}`} className="text-sm hover:text-blue-600 transition-colors truncate">
              {email}
            </a>
          </div>
          
          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href={`tel:${phone}`} className="text-sm hover:text-blue-600 transition-colors">
              {formatPhone(phone)}
            </a>
          </div>
          
          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
            </svg>
            <a 
              href={`http://${website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-blue-600 transition-colors"
            >
              {website}
            </a>
          </div>
        </div>

        {/* Address Information */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Address
          </h4>
          <p className="text-sm text-gray-600">
            {address.street}, {address.suite}
          </p>
          <p className="text-sm text-gray-600">
            {address.city}, {address.zipcode}
          </p>
        </div>

        {/* Company Information */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Company
          </h4>
          <p className="text-sm text-gray-800 font-medium mb-1">{company.name}</p>
          <p className="text-xs text-gray-600 italic">"{company.catchPhrase}"</p>
          <p className="text-xs text-gray-500 mt-1">{company.bs}</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            User #{id}
          </span>
          <div className="flex space-x-2">
            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">
              Contact
            </button>
            <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors">
              Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;