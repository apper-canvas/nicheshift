import messagesData from '@/services/mockData/messages.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MessagesService {
  constructor() {
    this.messages = [...messagesData];
  }

  async getAll() {
    await delay(300);
    // Sort by timestamp, oldest first for chat
    return this.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  async getById(id) {
    await delay(200);
    const message = this.messages.find(m => m.Id === parseInt(id));
    if (!message) {
      throw new Error('Message not found');
    }
    return { ...message };
  }

  async create(messageData) {
    await delay(200);
    
    const newMessage = {
      Id: Math.max(...this.messages.map(m => m.Id)) + 1,
      content: messageData.content,
      senderId: messageData.senderId || 'currentUser',
      sender: {
        name: 'You',
        avatar: null
      },
      timestamp: new Date().toISOString(),
      readBy: [messageData.senderId || 'currentUser']
    };
    
    this.messages.push(newMessage);
    return { ...newMessage };
  }

  async update(id, messageData) {
    await delay(250);
    
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Message not found');
    }
    
    this.messages[index] = {
      ...this.messages[index],
      ...messageData,
      Id: parseInt(id)
    };
    
    return { ...this.messages[index] };
  }

  async delete(id) {
    await delay(200);
    
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Message not found');
    }
    
    this.messages.splice(index, 1);
    return true;
  }

  async markAsRead(id, userId = 'currentUser') {
    await delay(150);
    
    const message = this.messages.find(m => m.Id === parseInt(id));
    if (!message) {
      throw new Error('Message not found');
    }
    
    if (!message.readBy) message.readBy = [];
    if (!message.readBy.includes(userId)) {
      message.readBy.push(userId);
    }
    
    return { ...message };
  }

  async getUnreadCount(userId = 'currentUser') {
    await delay(100);
    
    return this.messages.filter(message => 
      message.senderId !== userId && 
      (!message.readBy || !message.readBy.includes(userId))
    ).length;
  }

  async getRecent(limit = 10) {
    await delay(200);
    
    return this.messages
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }
}

export const messagesService = new MessagesService();