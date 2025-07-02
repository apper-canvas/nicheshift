import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const CreateEventModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const { title, description, date, time, location } = formData;
    
    if (!title.trim() || !date || !time || !location.trim()) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const eventDateTime = new Date(`${date}T${time}`);
    if (eventDateTime <= new Date()) {
      toast.error('Event date must be in the future!');
      return;
    }

    const eventData = {
      title: title.trim(),
      description: description.trim(),
      date: eventDateTime.toISOString(),
      location: location.trim(),
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
    };

    if (onSubmit) {
      onSubmit(eventData);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
    });
    onClose();
    toast.success('Event created successfully!');
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
    });
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
            <div className="bg-white rounded-card shadow-lift w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Create Event</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="X"
                  onClick={handleClose}
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <Input
                  label="Event Title"
                  type="text"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your event..."
                    className="w-full p-3 border border-gray-300 rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Input
                    label="Time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Location"
                  type="text"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  icon="MapPin"
                  required
                />

                <Input
                  label="Max Attendees (Optional)"
                  type="number"
                  placeholder="Leave empty for unlimited"
                  value={formData.maxAttendees}
                  onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                  min="1"
                />

                {/* Event Preview */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-card p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <ApperIcon name="Calendar" size={16} className="text-primary-600" />
                    <span className="text-sm font-medium text-primary-900">Event Preview</span>
                  </div>
                  <div className="text-sm text-primary-800">
                    {formData.title || 'Event Title'} •{' '}
                    {formData.date && formData.time 
                      ? new Date(`${formData.date}T${formData.time}`).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })
                      : 'Date & Time'
                    } •{' '}
                    {formData.location || 'Location'}
                  </div>
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
                  disabled={!formData.title.trim() || !formData.date || !formData.time || !formData.location.trim()}
                >
                  Create Event
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateEventModal;