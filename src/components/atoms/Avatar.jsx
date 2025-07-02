import React from 'react';
import { motion } from 'framer-motion';

const Avatar = ({ 
  src, 
  alt, 
  name, 
  size = 'md', 
  online = false, 
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const colors = [
    'bg-gradient-to-br from-primary-400 to-primary-600',
    'bg-gradient-to-br from-secondary-400 to-secondary-600',
    'bg-gradient-to-br from-accent-400 to-accent-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-green-400 to-green-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
  ];

  const getColorFromName = (name) => {
    if (!name) return colors[0];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      <div className={`${sizes[size]} rounded-full overflow-hidden shadow-soft`}>
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-white font-medium ${getColorFromName(name)}`}>
            {getInitials(name)}
          </div>
        )}
      </div>
      {online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      )}
    </motion.div>
  );
};

export default Avatar;