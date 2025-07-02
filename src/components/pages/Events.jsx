import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import EventCard from '@/components/molecules/EventCard';
import CreateEventModal from '@/components/organisms/CreateEventModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { eventsService } from '@/services/api/eventsService';
import { toast } from 'react-toastify';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('upcoming');

  const filters = [
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'indoor', label: 'Indoor' },
  ];

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, selectedFilter, viewMode]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await eventsService.getAll();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;
    const now = new Date();

    // Apply view mode filter
    if (viewMode === 'upcoming') {
      filtered = filtered.filter(event => new Date(event.date) >= now);
    } else if (viewMode === 'past') {
      filtered = filtered.filter(event => new Date(event.date) < now);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      switch (selectedFilter) {
        case 'thisWeek':
          filtered = filtered.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= now && eventDate <= oneWeek;
          });
          break;
        case 'thisMonth':
          filtered = filtered.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= now && eventDate <= oneMonth;
          });
          break;
        case 'outdoor':
          filtered = filtered.filter(event =>
            event.location.toLowerCase().includes('park') ||
            event.location.toLowerCase().includes('outdoor') ||
            event.title.toLowerCase().includes('walk') ||
            event.title.toLowerCase().includes('hike')
          );
          break;
        case 'indoor':
          filtered = filtered.filter(event =>
            event.location.toLowerCase().includes('center') ||
            event.location.toLowerCase().includes('hall') ||
            event.location.toLowerCase().includes('cafe')
          );
          break;
        default:
          break;
      }
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    setFilteredEvents(filtered);
  };

  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setSelectedFilter(filter);
  };

  const handleCreateEvent = async (eventData) => {
    try {
      const newEvent = await eventsService.create(eventData);
      setEvents(prev => [newEvent, ...prev]);
    } catch (err) {
      console.error('Error creating event:', err);
      toast.error('Failed to create event');
    }
  };

  const handleRSVP = async (eventId, attending) => {
    try {
      await eventsService.rsvp(eventId, attending);
      // Update events state to reflect RSVP
      setEvents(prev => prev.map(event => 
        event.Id === eventId 
          ? { 
              ...event, 
              attendees: attending 
                ? [...(event.attendees || []), { name: 'You', avatar: null }]
                : (event.attendees || []).filter(attendee => attendee.name !== 'You')
            }
          : event
      ));
    } catch (err) {
      console.error('Error updating RSVP:', err);
      toast.error('Failed to update RSVP');
    }
  };

  if (loading) {
    return <Loading type="events" />;
  }

  if (error) {
    return (
      <Error
        message="Unable to load events"
        description={error}
        onRetry={loadEvents}
        type="network"
      />
    );
  }

  const upcomingCount = events.filter(event => new Date(event.date) >= new Date()).length;
  const pastCount = events.length - upcomingCount;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Community Events
          </h1>
          <p className="text-gray-600 mt-1">
            Join local meetups and make new connections
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          icon="Plus"
          size="lg"
          className="self-start lg:self-auto"
        >
          Create Event
        </Button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-100 rounded-card p-1">
          <button
            onClick={() => setViewMode('upcoming')}
            className={`px-4 py-2 rounded-card text-sm font-medium transition-all duration-200 ${
              viewMode === 'upcoming'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ApperIcon name="Calendar" size={16} className="inline mr-2" />
            Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => setViewMode('past')}
            className={`px-4 py-2 rounded-card text-sm font-medium transition-all duration-200 ${
              viewMode === 'past'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ApperIcon name="History" size={16} className="inline mr-2" />
            Past ({pastCount})
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchBar
        placeholder="Search events..."
        onSearch={handleSearch}
        filters={filters}
      />

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <Empty
          type="events"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard
                event={event}
                onRSVP={handleRSVP}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default Events;