// Mock service layer implementation - ready for database migration
import postIdeasData from "@/services/mockData/postIdeas.json";

class PostIdeasService {
  constructor() {
    this.postIdeas = [...postIdeasData];
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
      return [...this.postIdeas];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching post ideas:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const idea = this.postIdeas.find(p => p.Id === parseInt(id));
      if (!idea) {
        throw new Error(`Post idea with Id ${id} not found`);
      }
      return { ...idea };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching post idea with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(ideaData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const newId = this.postIdeas.length > 0 ? Math.max(...this.postIdeas.map(p => p.Id)) + 1 : 1;
      const newIdea = {
        Id: newId,
        ...ideaData
      };
      this.postIdeas.push(newIdea);
      return { ...newIdea };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating post idea:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async update(id, ideaData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const index = this.postIdeas.findIndex(p => p.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Post idea with Id ${id} not found`);
      }
      this.postIdeas[index] = { ...this.postIdeas[index], ...ideaData };
      return { ...this.postIdeas[index] };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating post idea:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async delete(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = this.postIdeas.findIndex(p => p.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Post idea with Id ${id} not found`);
      }
      this.postIdeas.splice(index, 1);
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting post idea:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async generateIdeas(candidateProfile, eventsCalendar) {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate AI-generated ideas
      const generatedIdeas = [
        {
          brief: "Share a powerful quote about community unity with inspiring background visuals",
          contentType: "Image",
          themeTags: ["Unity", "Community", "Inspiration"]
        },
        {
          brief: "Create a video highlighting recent infrastructure improvements and their impact",
          contentType: "Video", 
          themeTags: ["Infrastructure", "Progress", "Development"]
        },
        {
          brief: "Post about upcoming healthcare initiatives and their benefits for families",
          contentType: "Text",
          themeTags: ["Healthcare", "Family", "Community"]
        },
        {
          brief: "Feature local business success stories and job creation achievements",
          contentType: "Image",
          themeTags: ["Economy", "Business", "Jobs"]
        },
        {
          brief: "Behind-the-scenes video of community engagement activities",
          contentType: "Video",
          themeTags: ["Community", "Engagement", "Transparency"]
        }
      ];

      const createdIdeas = [];
      for (const idea of generatedIdeas) {
        const newId = this.postIdeas.length > 0 ? Math.max(...this.postIdeas.map(p => p.Id)) + 1 : 1;
        const newIdea = {
          Id: newId,
          postDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "Idea",
          ...idea
        };
        this.postIdeas.push(newIdea);
        createdIdeas.push({ ...newIdea });
      }

      return createdIdeas;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error generating post ideas:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
}

export default new PostIdeasService();