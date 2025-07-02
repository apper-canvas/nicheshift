import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Header = ({ title, subtitle, showProfile = true, actions = [] }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { Id: 1, type: 'like', content: 'Sarah liked your post', time: '2m ago', read: false },
    { Id: 2, type: 'comment', content: 'Mike commented on your photo', time: '1h ago', read: false },
    { Id: 3, type: 'event', content: 'Dog Park Meetup starts in 30 minutes', time: '30m ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-display font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-3">
          {/* Custom Actions */}
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'secondary'}
              size="sm"
              icon={action.icon}
              onClick={action.onClick}
              className={action.className}
            >
              {action.label}
            </Button>
          ))}

          {/* Notifications */}
          {showProfile && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                icon="Bell"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </div>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-card shadow-lift border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.Id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            !notification.read ? 'bg-blue-500' : 'bg-transparent'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.content}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Button variant="text" size="sm" className="w-full">
                      View all notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Profile */}
          {showProfile && (
            <Avatar
              name="You"
              size="md"
              online={true}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;