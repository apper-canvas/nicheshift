import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong", 
  description = "We're having trouble loading this content. Please try again.",
  onRetry,
  type = 'general'
}) => {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return 'WifiOff';
      case 'notFound':
        return 'SearchX';
      case 'permission':
        return 'ShieldAlert';
      default:
        return 'AlertTriangle';
    }
  };

  const getErrorColor = () => {
    switch (type) {
      case 'network':
        return 'text-blue-500';
      case 'notFound':
        return 'text-purple-500';
      case 'permission':
        return 'text-amber-500';
      default:
        return 'text-red-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className={`w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6`}
      >
        <ApperIcon 
          name={getErrorIcon()} 
          size={32} 
          className={getErrorColor()}
        />
      </motion.div>

      {/* Error Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center space-x-3"
      >
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            icon="RefreshCw"
          >
            Try Again
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
          icon="RotateCcw"
        >
          Reload Page
        </Button>
      </motion.div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full opacity-20" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent-100 to-primary-100 rounded-full opacity-20" />
      </div>
    </motion.div>
  );
};

export default Error;