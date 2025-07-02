// Badge system for member achievements
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class BadgesService {
  constructor() {
    this.badgeDefinitions = [
      {
        id: 'community-contributor',
        name: 'Community Contributor',
        description: 'Active member with multiple posts',
        icon: 'MessageSquare',
        color: 'primary',
        requirements: {
          postsCount: 5
        }
      },
      {
        id: 'event-enthusiast',
        name: 'Event Enthusiast',
        description: 'Regular event attendee',
        icon: 'Calendar',
        color: 'secondary',
        requirements: {
          eventsAttended: 3
        }
      },
      {
        id: 'event-organizer',
        name: 'Event Organizer',
        description: 'Helps organize community events',
        icon: 'Users',
        color: 'accent',
        requirements: {
          eventsOrganized: 1
        }
      },
      {
        id: 'social-butterfly',
        name: 'Social Butterfly',
        description: 'Well-connected community member',
        icon: 'Heart',
        color: 'success',
        requirements: {
          connectionsCount: 10
        }
      },
      {
        id: 'veteran-member',
        name: 'Veteran Member',
        description: 'Long-time community member',
        icon: 'Award',
        color: 'warning',
        requirements: {
          daysSinceJoined: 90
        }
      },
      {
        id: 'super-connector',
        name: 'Super Connector',
        description: 'Exceptional network builder',
        icon: 'Star',
        color: 'error',
        requirements: {
          connectionsCount: 20,
          postsCount: 10
        }
      }
    ];
  }

  async getAll() {
    await delay(100);
    return [...this.badgeDefinitions];
  }

  async getById(id) {
    await delay(50);
    const badge = this.badgeDefinitions.find(b => b.id === id);
    if (!badge) {
      throw new Error('Badge not found');
    }
    return { ...badge };
  }

  calculateEarnedBadges(member) {
    const earnedBadges = [];
    const daysSinceJoined = Math.floor(
      (new Date() - new Date(member.joinedAt)) / (1000 * 60 * 60 * 24)
    );

    for (const badge of this.badgeDefinitions) {
      let earned = true;
      
      // Check each requirement
      for (const [requirement, threshold] of Object.entries(badge.requirements)) {
        switch (requirement) {
          case 'postsCount':
            if ((member.postsCount || 0) < threshold) earned = false;
            break;
          case 'eventsAttended':
            if ((member.eventsAttended || 0) < threshold) earned = false;
            break;
          case 'eventsOrganized':
            if ((member.eventsOrganized || 0) < threshold) earned = false;
            break;
          case 'connectionsCount':
            if ((member.connectionsCount || 0) < threshold) earned = false;
            break;
          case 'daysSinceJoined':
            if (daysSinceJoined < threshold) earned = false;
            break;
          default:
            earned = false;
        }
        
        if (!earned) break;
      }
      
      if (earned) {
        earnedBadges.push({
          ...badge,
          earnedAt: new Date().toISOString()
        });
      }
    }

    return earnedBadges;
  }
}

export const badgesService = new BadgesService();