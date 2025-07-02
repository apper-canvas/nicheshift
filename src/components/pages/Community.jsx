import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import SearchBar from '@/components/molecules/SearchBar';
import MemberCard from '@/components/molecules/MemberCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { membersService } from '@/services/api/membersService';
import { communityService } from '@/services/api/communityService';
import { toast } from 'react-toastify';

const Community = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { value: 'active', label: 'Active Members' },
    { value: 'new', label: 'New Members' },
    { value: 'organizers', label: 'Event Organizers' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [members, searchTerm, selectedFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [membersData, communityData] = await Promise.all([
        membersService.getAll(),
        communityService.getInfo()
      ]);
      
      setMembers(membersData);
      setCommunityInfo(communityData);
    } catch (err) {
      setError('Failed to load community data');
      console.error('Error loading community data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterMembers = () => {
    let filtered = members;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.interests?.some(interest => 
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      switch (selectedFilter) {
        case 'active':
          filtered = filtered.filter(member => member.online || member.postsCount > 0);
          break;
        case 'new':
          filtered = filtered.filter(member => 
            new Date(member.joinedAt) >= oneMonthAgo
          );
          break;
        case 'organizers':
          filtered = filtered.filter(member => member.eventsOrganized > 0);
          break;
        default:
          break;
      }
    }

    setFilteredMembers(filtered);
  };

  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setSelectedFilter(filter);
  };

  const handleMessage = (memberId) => {
    toast.success('Opening chat...');
    // In a real app, this would navigate to chat with the specific member
  };

  const handleViewProfile = (memberId) => {
    toast.info('Profile view coming soon!');
    // In a real app, this would navigate to the member's profile
  };

  if (loading) {
    return <Loading type="members" />;
  }

  if (error) {
    return (
      <Error
        message="Unable to load community"
        description={error}
        onRetry={loadData}
        type="network"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Community Header */}
      {communityInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-card p-6 text-white"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-display font-semibold mb-2">
                {communityInfo.name}
              </h1>
              <p className="text-primary-100 mb-3">
                {communityInfo.description}
              </p>
              <div className="flex items-center text-sm text-primary-100">
                <ApperIcon name="MapPin" size={16} className="mr-1" />
                {communityInfo.location}
              </div>
            </div>
            
            {/* Community Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{communityInfo.memberCount}</div>
                <div className="text-xs text-primary-100">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{communityInfo.eventsCount || 12}</div>
                <div className="text-xs text-primary-100">Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{communityInfo.postsCount || 89}</div>
                <div className="text-xs text-primary-100">Posts</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Community Rules */}
      {communityInfo?.rules && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-card shadow-soft p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Shield" size={20} className="mr-2 text-primary-500" />
            Community Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {communityInfo.rules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ApperIcon name="Check" size={12} className="text-green-600" />
                </div>
                <span className="text-sm text-gray-700">{rule}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Members Section */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Community Members
            </h2>
            <p className="text-gray-600">
              Connect with {filteredMembers.length} amazing dog lovers
            </p>
          </div>
          <Button
            variant="secondary"
            icon="UserPlus"
          >
            Invite Friends
          </Button>
        </div>

        {/* Search and Filters */}
        <SearchBar
          placeholder="Search members..."
          onSearch={handleSearch}
          filters={filters}
        />

        {/* Members Grid */}
        {filteredMembers.length === 0 ? (
          <Empty
            type="members"
            onAction={() => toast.info('Invite feature coming soon!')}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MemberCard
                  member={member}
                  onMessage={handleMessage}
                  onViewProfile={handleViewProfile}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Community;