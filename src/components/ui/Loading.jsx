import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 bg-pos-0 rounded-card ${className}`} 
       style={{
         backgroundSize: '200% 100%',
         animation: 'shimmer 2s infinite'
       }} />
);

const Loading = ({ type = 'posts' }) => {
  if (type === 'posts') {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-card shadow-soft p-6"
          >
            {/* Post Header */}
            <div className="flex items-center space-x-3 mb-4">
              <LoadingSkeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <LoadingSkeleton className="h-4 w-32 mb-2" />
                <LoadingSkeleton className="h-3 w-20" />
              </div>
            </div>
            
            {/* Post Content */}
            <div className="space-y-2 mb-4">
              <LoadingSkeleton className="h-4 w-full" />
              <LoadingSkeleton className="h-4 w-3/4" />
              <LoadingSkeleton className="h-4 w-1/2" />
            </div>
            
            {/* Post Image */}
            <LoadingSkeleton className="h-48 w-full mb-4" />
            
            {/* Post Actions */}
            <div className="flex items-center space-x-4">
              <LoadingSkeleton className="h-8 w-16" />
              <LoadingSkeleton className="h-8 w-16" />
              <LoadingSkeleton className="h-8 w-16" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'events') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-card shadow-soft p-6"
          >
            <LoadingSkeleton className="h-6 w-3/4 mb-3" />
            <LoadingSkeleton className="h-4 w-full mb-4" />
            <div className="space-y-2 mb-4">
              <LoadingSkeleton className="h-4 w-2/3" />
              <LoadingSkeleton className="h-4 w-1/2" />
              <LoadingSkeleton className="h-4 w-3/4" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                <LoadingSkeleton className="w-8 h-8 rounded-full" />
                <LoadingSkeleton className="w-8 h-8 rounded-full" />
                <LoadingSkeleton className="w-8 h-8 rounded-full" />
              </div>
              <LoadingSkeleton className="h-8 w-20" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'chat') {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-end space-x-2 ${i % 3 === 0 ? 'flex-row-reverse' : ''}`}
          >
            <LoadingSkeleton className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className={`max-w-xs ${i % 3 === 0 ? 'ml-auto' : ''}`}>
              <LoadingSkeleton className={`h-12 ${i % 2 === 0 ? 'w-32' : 'w-48'} rounded-2xl`} />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'members') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-card shadow-soft p-6"
          >
            <div className="text-center mb-4">
              <LoadingSkeleton className="w-16 h-16 rounded-full mx-auto mb-3" />
              <LoadingSkeleton className="h-5 w-24 mx-auto mb-2" />
              <LoadingSkeleton className="h-3 w-32 mx-auto" />
            </div>
            <LoadingSkeleton className="h-4 w-full mb-4" />
            <div className="flex flex-wrap gap-1 mb-4">
              <LoadingSkeleton className="h-5 w-16" />
              <LoadingSkeleton className="h-5 w-12" />
              <LoadingSkeleton className="h-5 w-20" />
            </div>
            <div className="flex space-x-2">
              <LoadingSkeleton className="h-8 flex-1" />
              <LoadingSkeleton className="h-8 w-16" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Default loading
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-3 border-primary-200 border-t-primary-600 rounded-full"
      />
    </div>
  );
};

// Add custom styles for shimmer effect
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;
document.head.appendChild(style);

export default Loading;