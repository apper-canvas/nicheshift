import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import PostCard from '@/components/molecules/PostCard';
import CreatePostModal from '@/components/organisms/CreatePostModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { postsService } from '@/services/api/postsService';
import { toast } from 'react-toastify';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { value: 'text', label: 'Text Posts' },
    { value: 'photo', label: 'Photos' },
    { value: 'recent', label: 'Recent' },
  ];

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, selectedFilter]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await postsService.getAll();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'text':
          filtered = filtered.filter(post => !post.imageUrl);
          break;
        case 'photo':
          filtered = filtered.filter(post => post.imageUrl);
          break;
        case 'recent':
          filtered = filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          break;
        default:
          break;
      }
    }

    setFilteredPosts(filtered);
  };

  const handleSearch = (term, filter) => {
    setSearchTerm(term);
    setSelectedFilter(filter);
  };

  const handleCreatePost = async (postData) => {
    try {
      const newPost = await postsService.create(postData);
      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error('Failed to create post');
    }
  };

  const handleLike = async (postId) => {
    try {
      await postsService.like(postId);
      // Update posts state to reflect like
      setPosts(prev => prev.map(post => 
        post.Id === postId 
          ? { ...post, likes: [...(post.likes || []), 'currentUser'] }
          : post
      ));
    } catch (err) {
      console.error('Error liking post:', err);
      toast.error('Failed to like post');
    }
  };

  const handleComment = async (postId, content) => {
    try {
      await postsService.addComment(postId, content);
      // Update posts state to include new comment
      setPosts(prev => prev.map(post => 
        post.Id === postId 
          ? { 
              ...post, 
              comments: [...(post.comments || []), {
                Id: Date.now(),
                content,
                author: { name: 'You', avatar: null },
                timestamp: new Date().toISOString()
              }]
            }
          : post
      ));
    } catch (err) {
      console.error('Error adding comment:', err);
      toast.error('Failed to add comment');
    }
  };

  if (loading) {
    return <Loading type="posts" />;
  }

  if (error) {
    return (
      <Error
        message="Unable to load posts"
        description={error}
        onRetry={loadPosts}
        type="network"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Community Feed
          </h1>
          <p className="text-gray-600 mt-1">
            Stay connected with your local dog-loving community
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateModal(true)}
          icon="Plus"
          size="lg"
          className="self-start lg:self-auto"
        >
          Create Post
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchBar
        placeholder="Search posts and members..."
        onSearch={handleSearch}
        filters={filters}
      />

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <Empty
          type="posts"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard
                post={post}
                onLike={handleLike}
                onComment={handleComment}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default Feed;