import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = 'Inbox',
  title = "Nothing here yet",
  description = "Get started by creating something new!",
  actionLabel = "Get Started",
  onAction,
  type = 'general'
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case 'posts':
        return {
          icon: 'MessageSquare',
          title: "No posts yet",
          description: "Be the first to share something with your community! Start a conversation and connect with others.",
          actionLabel: "Create Post"
        };
      case 'events':
        return {
          icon: 'Calendar',
          title: "No events scheduled",
          description: "Ready to bring everyone together? Create an event and start building memorable experiences.",
          actionLabel: "Create Event"
        };
      case 'chat':
        return {
          icon: 'MessageCircle',
          title: "No messages yet",
          description: "Start a conversation! Share thoughts, ask questions, or just say hello to your community.",
          actionLabel: "Start Chatting"
        };
      case 'members':
        return {
          icon: 'Users',
          title: "No members found",
          description: "Invite friends and like-minded people to join your community and grow together.",
          actionLabel: "Invite Members"
        };
      case 'search':
        return {
          icon: 'Search',
          title: "No results found",
          description: "Try adjusting your search terms or browse all content to discover something new.",
          actionLabel: "Browse All"
        };
      default:
        return { icon, title, description, actionLabel };
    }
  };

  const content = getEmptyContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center relative"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.1 
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 via-white to-gray-50 flex items-center justify-center mb-6 shadow-soft"
        >
          <ApperIcon 
            name={content.icon} 
            size={36} 
            className="text-gray-400"
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-gray-900 mb-3"
        >
          {content.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8 max-w-md leading-relaxed"
        >
          {content.description}
        </motion.p>

        {/* Action Button */}
        {onAction && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onAction}
              icon="Plus"
              className="shadow-soft hover:shadow-lift"
            >
              {content.actionLabel}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;