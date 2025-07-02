import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const PostCard = ({ post, onLike, onComment }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) {
      onLike(post.Id);
    }
    toast.success(liked ? 'Like removed' : 'Post liked!');
  };

  const handleComment = () => {
    if (commentText.trim()) {
      if (onComment) {
        onComment(post.Id, commentText);
      }
      setCommentText('');
      toast.success('Comment added!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-card shadow-soft hover:shadow-lift transition-all duration-200 p-6 mb-4"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar
            src={post.author?.avatar}
            name={post.author?.name}
            size="md"
            online={post.author?.online}
          />
          <div>
            <h4 className="font-medium text-gray-900">{post.author?.name}</h4>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" icon="MoreHorizontal" />
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
        {post.imageUrl && (
          <div className="mt-3">
            <img
              src={post.imageUrl}
              alt="Post content"
              className="w-full rounded-card object-cover max-h-96"
            />
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
              liked
                ? 'text-red-600 bg-red-50 hover:bg-red-100'
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <ApperIcon name={liked ? "Heart" : "Heart"} size={16} className={liked ? "fill-current" : ""} />
            <span className="text-sm font-medium">
              {post.likes?.length || 0} {liked && !post.likes?.length ? 1 : ''}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
          >
            <ApperIcon name="MessageCircle" size={16} />
            <span className="text-sm font-medium">{post.comments?.length || 0}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <ApperIcon name="Share" size={16} />
          </motion.button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-gray-100"
        >
          {/* Existing Comments */}
          {post.comments?.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3 mb-3">
              <Avatar
                src={comment.author?.avatar}
                name={comment.author?.name}
                size="sm"
              />
              <div className="flex-1 bg-gray-50 rounded-card p-3">
                <p className="font-medium text-sm text-gray-900">{comment.author?.name}</p>
                <p className="text-gray-700 text-sm">{comment.content}</p>
              </div>
            </div>
          ))}

          {/* Add Comment */}
          <div className="flex items-center space-x-3 mt-3">
            <Avatar name="You" size="sm" />
            <div className="flex-1 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleComment}
                disabled={!commentText.trim()}
                icon="Send"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PostCard;