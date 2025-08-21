// Mock service layer implementation - ready for database migration
import eventsCalendarData from "@/services/mockData/eventsCalendar.json";

class EventsCalendarService {
  constructor() {
    this.events = [...eventsCalendarData];
    // Initialize ApperClient for future database integration
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...this.events];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching events calendar:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const event = this.events.find(e => e.Id === parseInt(id));
      if (!event) {
        throw new Error(`Event with Id ${id} not found`);
      }
      return { ...event };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching event with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(eventData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const newId = this.events.length > 0 ? Math.max(...this.events.map(e => e.Id)) + 1 : 1;
      const newEvent = {
        Id: newId,
        ...eventData
      };
      this.events.push(newEvent);
      return { ...newEvent };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating event:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async update(id, eventData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const index = this.events.findIndex(e => e.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Event with Id ${id} not found`);
      }
      this.events[index] = { ...this.events[index], ...eventData };
      return { ...this.events[index] };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating event:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async delete(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = this.events.findIndex(e => e.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Event with Id ${id} not found`);
      }
      this.events.splice(index, 1);
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting event:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async getUpcoming(days = 30) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const today = new Date();
      const future = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
      
      return this.events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= today && eventDate <= future;
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching upcoming events:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }
}

export default new EventsCalendarService();