import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error('Please write something to share!');
      return;
    }

    const postData = {
      content: content.trim(),
      imageUrl: imagePreview,
    };

    if (onSubmit) {
      onSubmit(postData);
    }

    // Reset form
    setContent('');
    setImage(null);
    setImagePreview(null);
    onClose();
    toast.success('Post shared successfully!');
  };

  const handleClose = () => {
    setContent('');
    setImage(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-card shadow-lift w-full max-w-lg max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Create Post</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="X"
                  onClick={handleClose}
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <Avatar name="You" size="md" />
                  <div>
                    <p className="font-medium text-gray-900">You</p>
                    <p className="text-sm text-gray-500">Sharing to NYC Dog Lovers</p>
                  </div>
                </div>

                {/* Text Input */}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full p-3 border border-gray-300 rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  maxLength={500}
                />
                <div className="text-right">
                  <span className="text-sm text-gray-400">
                    {content.length}/500
                  </span>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-card"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="X"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100"
                    />
                  </div>
                )}

                {/* Media Options */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer text-gray-600 hover:text-primary-600">
                    <ApperIcon name="Image" size={20} />
                    <span className="text-sm">Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <Button
                  variant="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                >
                  Share Post
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;