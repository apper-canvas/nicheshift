import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';

const ChatMessage = ({ message, isOwn = false, showAvatar = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end space-x-2 mb-4 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}
    >
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <Avatar
          src={message.sender?.avatar}
          name={message.sender?.name}
          size="sm"
          className="flex-shrink-0"
        />
      )}

      {/* Message Content */}
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'ml-auto' : ''}`}>
        {/* Sender Name (for group chats) */}
        {!isOwn && showAvatar && (
          <p className="text-xs text-gray-500 mb-1 px-3">
            {message.sender?.name}
          </p>
        )}

        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Timestamp */}
        <p className={`text-xs text-gray-400 mt-1 px-3 ${isOwn ? 'text-right' : ''}`}>
          {format(new Date(message.timestamp), 'HH:mm')}
        </p>
      </div>

      {/* Spacer for own messages */}
      {isOwn && <div className="w-8 flex-shrink-0" />}
    </motion.div>
  );
};

export default ChatMessage;