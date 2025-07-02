import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const BottomNavigation = () => {
  const navItems = [
    { path: '/feed', icon: 'Home', label: 'Feed' },
    { path: '/chat', icon: 'MessageCircle', label: 'Chat', badge: 3 },
    { path: '/events', icon: 'Calendar', label: 'Events', badge: 2 },
    { path: '/community', icon: 'Users', label: 'Community' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40 lg:hidden">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center p-2 rounded-card transition-all duration-200 ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-primary-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Background for active state */}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavActiveBackground"
                    className="absolute inset-0 bg-primary-50 rounded-card"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Icon and Badge */}
                <div className="relative z-10 mb-1">
                  <ApperIcon name={item.icon} size={20} />
                  {item.badge && (
                    <div className="absolute -top-2 -right-2">
                      <Badge variant="error" size="xs">
                        {item.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                
                {/* Label */}
                <span className="text-xs font-medium z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavigation;