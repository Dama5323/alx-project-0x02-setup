import React from 'react';
import { PostCardProps } from '../../interfaces';

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  content,
  userId,
  userName = `User ${userId}`,
  className = ''
}) => {
  // Generate a consistent color based on userId
  const getUserColor = (userId: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800'
    ];
    return colors[userId % colors.length];
  };

  // Truncate content if it's too long
  const truncateContent = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-800 leading-tight flex-1 pr-2">
            {title}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUserColor(userId)}`}>
            #{id}
          </span>
        </div>
        
        {/* User Info */}
        <div className="flex items-center mb-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getUserColor(userId).replace('text-', 'bg-').split(' ')[0]}`}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{userName}</p>
            <p className="text-xs text-gray-500">User ID: {userId}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-6">
        <p className="text-gray-600 leading-relaxed">
          {truncateContent(content)}
        </p>
      </div>

      {/* Post Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Post #{id}
          </span>
          <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;