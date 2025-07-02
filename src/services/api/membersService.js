import membersData from '@/services/mockData/members.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MembersService {
  constructor() {
    this.members = [...membersData];
  }

  async getAll() {
    await delay(300);
    return this.members.map(member => ({ ...member }));
  }

  async getById(id) {
    await delay(200);
    const member = this.members.find(m => m.Id === parseInt(id));
    if (!member) {
      throw new Error('Member not found');
    }
    return { ...member };
  }

  async create(memberData) {
    await delay(400);
    
    const newMember = {
      Id: Math.max(...this.members.map(m => m.Id)) + 1,
      name: memberData.name,
      bio: memberData.bio || '',
      avatar: memberData.avatar || null,
      interests: memberData.interests || [],
      joinedAt: new Date().toISOString(),
      online: true,
      postsCount: 0,
      eventsAttended: 0,
      connectionsCount: 0,
      eventsOrganized: 0
    };
    
    this.members.push(newMember);
    return { ...newMember };
  }

  async update(id, memberData) {
    await delay(350);
    
    const index = this.members.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Member not found');
    }
    
    this.members[index] = {
      ...this.members[index],
      ...memberData,
      Id: parseInt(id)
    };
    
    return { ...this.members[index] };
  }

  async delete(id) {
    await delay(250);
    
    const index = this.members.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Member not found');
    }
    
    this.members.splice(index, 1);
    return true;
  }

  async getOnline() {
    await delay(200);
    return this.members.filter(member => member.online);
  }

  async getNewMembers(days = 30) {
    await delay(250);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return this.members.filter(member => 
      new Date(member.joinedAt) >= cutoffDate
    );
  }

  async getActiveMembers() {
    await delay(250);
    return this.members.filter(member => 
      member.online || member.postsCount > 0 || member.eventsAttended > 0
    );
  }

  async search(query) {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    
    return this.members.filter(member =>
      member.name.toLowerCase().includes(lowercaseQuery) ||
      member.bio?.toLowerCase().includes(lowercaseQuery) ||
      member.interests?.some(interest => 
        interest.toLowerCase().includes(lowercaseQuery)
      )
    );
  }
}

export const membersService = new MembersService();