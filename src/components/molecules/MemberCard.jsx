import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const MemberCard = ({ member, onMessage, onViewProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-card shadow-soft hover:shadow-lift transition-all duration-200 p-6"
    >
      {/* Member Header */}
      <div className="text-center mb-4">
        <Avatar
          src={member.avatar}
          name={member.name}
          size="xl"
          online={member.online}
          className="mx-auto mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
        <p className="text-sm text-gray-500">
          Joined {formatDistanceToNow(new Date(member.joinedAt), { addSuffix: true })}
        </p>
      </div>

      {/* Member Bio */}
      {member.bio && (
        <p className="text-gray-600 text-sm text-center mb-4 leading-relaxed">
          {member.bio}
        </p>
      )}

      {/* Member Interests */}
      {member.interests && member.interests.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">INTERESTS</p>
          <div className="flex flex-wrap gap-1">
            {member.interests.slice(0, 3).map((interest, index) => (
              <Badge key={index} variant="primary" size="xs">
                {interest}
              </Badge>
            ))}
            {member.interests.length > 3 && (
              <Badge variant="gray" size="xs">
                +{member.interests.length - 3}
              </Badge>
            )}
          </div>
        </div>
      )}

{/* Member Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-card">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{member.postsCount || 0}</p>
          <p className="text-xs text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{member.eventsAttended || 0}</p>
          <p className="text-xs text-gray-500">Events</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{member.connectionsCount || 0}</p>
          <p className="text-xs text-gray-500">Connections</p>
        </div>
      </div>

      {/* Achievement Badges */}
      {member.badges && member.badges.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">ACHIEVEMENTS</p>
          <div className="flex flex-wrap gap-1 justify-center">
            {member.badges.slice(0, 3).map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <Badge variant={badge.color} size="xs" className="flex items-center gap-1">
                  <ApperIcon name={badge.icon} size={12} />
                  <span className="hidden sm:inline">{badge.name}</span>
                </Badge>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {badge.description}
                </div>
              </motion.div>
            ))}
            {member.badges.length > 3 && (
              <Badge variant="gray" size="xs">
                +{member.badges.length - 3}
              </Badge>
            )}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="primary"
          size="sm"
          icon="MessageCircle"
          onClick={() => onMessage && onMessage(member.Id)}
          className="flex-1"
        >
          Message
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon="User"
          onClick={() => onViewProfile && onViewProfile(member.Id)}
        >
          Profile
        </Button>
      </div>
    </motion.div>
  );
};

export default MemberCard;