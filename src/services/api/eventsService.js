import eventsData from '@/services/mockData/events.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EventsService {
  constructor() {
    this.events = [...eventsData];
  }

  async getAll() {
    await delay(300);
    // Sort by date, upcoming first
    return this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  async getById(id) {
    await delay(200);
    const event = this.events.find(e => e.Id === parseInt(id));
    if (!event) {
      throw new Error('Event not found');
    }
    return { ...event };
  }

  async create(eventData) {
    await delay(400);
    
    const newEvent = {
      Id: Math.max(...this.events.map(e => e.Id)) + 1,
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      location: eventData.location,
      organizerId: 'currentUser',
      organizer: {
        name: 'You',
        avatar: null
      },
      attendees: [],
      maxAttendees: eventData.maxAttendees || null,
      createdAt: new Date().toISOString()
    };
    
    this.events.push(newEvent);
    return { ...newEvent };
  }

  async update(id, eventData) {
    await delay(350);
    
    const index = this.events.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Event not found');
    }
    
    this.events[index] = {
      ...this.events[index],
      ...eventData,
      Id: parseInt(id)
    };
    
    return { ...this.events[index] };
  }

  async delete(id) {
    await delay(250);
    
    const index = this.events.findIndex(e => e.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Event not found');
    }
    
    this.events.splice(index, 1);
    return true;
  }

  async rsvp(id, attending) {
    await delay(300);
    
    const event = this.events.find(e => e.Id === parseInt(id));
    if (!event) {
      throw new Error('Event not found');
    }
    
    if (!event.attendees) event.attendees = [];
    
    const userAttendeeIndex = event.attendees.findIndex(attendee => attendee.name === 'You');
    
    if (attending && userAttendeeIndex === -1) {
      // Check if event is full
      if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
        throw new Error('Event is full');
      }
      
      event.attendees.push({
        name: 'You',
        avatar: null,
        rsvpDate: new Date().toISOString()
      });
    } else if (!attending && userAttendeeIndex !== -1) {
      event.attendees.splice(userAttendeeIndex, 1);
    }
    
    return { ...event };
  }

  async getUpcoming() {
    await delay(250);
    const now = new Date();
    return this.events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  async getPast() {
    await delay(250);
    const now = new Date();
    return this.events
      .filter(event => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

export const eventsService = new EventsService();