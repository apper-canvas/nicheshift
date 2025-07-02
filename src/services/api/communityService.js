import communityData from '@/services/mockData/community.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CommunityService {
  constructor() {
    this.community = { ...communityData };
  }

  async getInfo() {
    await delay(200);
    return { ...this.community };
  }

  async updateInfo(updates) {
    await delay(300);
    this.community = {
      ...this.community,
      ...updates
    };
    return { ...this.community };
  }

  async getRules() {
    await delay(150);
    return [...this.community.rules];
  }

  async updateRules(rules) {
    await delay(250);
    this.community.rules = [...rules];
    return [...this.community.rules];
  }

  async getStats() {
    await delay(200);
    return {
      memberCount: this.community.memberCount,
      eventsCount: this.community.eventsCount || 12,
      postsCount: this.community.postsCount || 89,
      activeToday: this.community.activeToday || 23
    };
  }

  async updateMemberCount(count) {
    await delay(100);
    this.community.memberCount = count;
    return this.community.memberCount;
  }
}

export const communityService = new CommunityService();