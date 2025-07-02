import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const EventCard = ({ event, onRSVP }) => {
  const [attending, setAttending] = useState(false);

  const handleRSVP = () => {
    setAttending(!attending);
    if (onRSVP) {
      onRSVP(event.Id, !attending);
    }
    toast.success(attending ? 'RSVP cancelled' : 'RSVP confirmed!');
  };

  const attendeeCount = event.attendees?.length || 0;
  const isFullyBooked = event.maxAttendees && attendeeCount >= event.maxAttendees;
  const spotsLeft = event.maxAttendees ? event.maxAttendees - attendeeCount : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-card shadow-soft hover:shadow-lift transition-all duration-200 overflow-hidden"
    >
      {/* Event Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
          </div>
          {isFullyBooked && (
            <Badge variant="error" size="sm">Full</Badge>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Calendar" size={16} className="mr-2 text-primary-500" />
            {format(new Date(event.date), 'PPP p')}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="MapPin" size={16} className="mr-2 text-primary-500" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Users" size={16} className="mr-2 text-primary-500" />
            {attendeeCount} attending
            {spotsLeft !== null && (
              <span className="ml-1">• {spotsLeft} spots left</span>
            )}
          </div>
        </div>

        {/* Attendee Avatars */}
        {event.attendees && event.attendees.length > 0 && (
          <div className="flex items-center mb-4">
            <div className="flex -space-x-2">
              {event.attendees.slice(0, 4).map((attendee, index) => (
                <Avatar
                  key={index}
                  src={attendee.avatar}
                  name={attendee.name}
                  size="sm"
                  className="border-2 border-white"
                />
              ))}
              {event.attendees.length > 4 && (
                <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    +{event.attendees.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar
              src={event.organizer?.avatar}
              name={event.organizer?.name}
              size="xs"
            />
            <span className="text-sm text-gray-500">
              by {event.organizer?.name}
            </span>
          </div>
          <Button
            variant={attending ? "secondary" : "primary"}
            size="sm"
            onClick={handleRSVP}
            disabled={!attending && isFullyBooked}
            icon={attending ? "Check" : "Plus"}
          >
            {attending ? 'Attending' : isFullyBooked ? 'Full' : 'RSVP'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;