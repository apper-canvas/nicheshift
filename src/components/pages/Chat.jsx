import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Avatar from '@/components/atoms/Avatar';
import ChatMessage from '@/components/molecules/ChatMessage';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { messagesService } from '@/services/api/messagesService';
import { membersService } from '@/services/api/membersService';
import { toast } from 'react-toastify';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [onlineMembers, setOnlineMembers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [messagesData, membersData] = await Promise.all([
        messagesService.getAll(),
        membersService.getAll()
      ]);
      
      setMessages(messagesData);
      setMembers(membersData);
      setOnlineMembers(membersData.filter(member => member.online));
    } catch (err) {
      setError('Failed to load chat data');
      console.error('Error loading chat data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      content: newMessage.trim(),
      senderId: 'currentUser',
    };

    try {
      // Optimistically add message
      const tempMessage = {
        Id: Date.now(),
        content: newMessage.trim(),
        sender: { name: 'You', avatar: null },
        timestamp: new Date().toISOString(),
        senderId: 'currentUser'
      };
      
      setMessages(prev => [...prev, tempMessage]);
      setNewMessage('');

      // Send to server
      await messagesService.create(messageData);
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message');
      // Remove the failed message
      setMessages(prev => prev.filter(msg => msg.Id !== tempMessage.Id));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return <Loading type="chat" />;
  }

  if (error) {
    return (
      <Error
        message="Unable to load chat"
        description={error}
        onRetry={loadData}
        type="network"
      />
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <div className="bg-white rounded-card shadow-soft p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-semibold text-gray-900">
              Community Chat
            </h1>
            <p className="text-sm text-gray-500">
              {onlineMembers.length} members online
            </p>
          </div>
          
          {/* Online Members */}
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {onlineMembers.slice(0, 5).map((member) => (
                <Avatar
                  key={member.Id}
                  src={member.avatar}
                  name={member.name}
                  size="sm"
                  online={true}
                  className="border-2 border-white"
                />
              ))}
              {onlineMembers.length > 5 && (
                <div className="w-8 h-8 bg-green-100 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-green-700">
                    +{onlineMembers.length - 5}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 bg-white rounded-card shadow-soft overflow-hidden flex flex-col">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <Empty
              type="chat"
              onAction={() => document.getElementById('message-input')?.focus()}
            />
          ) : (
            <AnimatePresence>
              {messages.map((message, index) => {
                const isOwn = message.senderId === 'currentUser';
                const showAvatar = !isOwn && (
                  index === 0 || 
                  messages[index - 1].senderId !== message.senderId
                );
                
                return (
                  <ChatMessage
                    key={message.Id}
                    message={message}
                    isOwn={isOwn}
                    showAvatar={showAvatar}
                  />
                );
              })}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-end space-x-3">
            <Avatar name="You" size="sm" />
            <div className="flex-1 flex items-end space-x-2">
              <div className="flex-1">
                <textarea
                  id="message-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-card resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={1}
                  style={{ 
                    minHeight: '40px',
                    maxHeight: '120px',
                    resize: 'none'
                  }}
                />
              </div>
              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                icon="Send"
                size="md"
              />
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                <ApperIcon name="Smile" size={14} />
                <span>Emoji</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                <ApperIcon name="Paperclip" size={14} />
                <span>Attach</span>
              </button>
            </div>
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;