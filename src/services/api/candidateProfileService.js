// Mock service layer implementation - ready for database migration
import candidateProfilesData from "@/services/mockData/candidateProfiles.json";

class CandidateProfileService {
  constructor() {
    this.profiles = [...candidateProfilesData];
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
      // Mock implementation with realistic delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...this.profiles];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching candidate profiles:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const profile = this.profiles.find(p => p.Id === parseInt(id));
      if (!profile) {
        throw new Error(`Profile with Id ${id} not found`);
      }
      return { ...profile };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching candidate profile with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async getCurrent() {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return this.profiles.length > 0 ? { ...this.profiles[0] } : null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching current candidate profile:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      return null;
    }
  }

  async create(profileData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const newId = this.profiles.length > 0 ? Math.max(...this.profiles.map(p => p.Id)) + 1 : 1;
      const newProfile = {
        Id: newId,
        ...profileData
      };
      this.profiles.push(newProfile);
      return { ...newProfile };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating candidate profile:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async update(id, profileData) {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      const index = this.profiles.findIndex(p => p.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Profile with Id ${id} not found`);
      }
      this.profiles[index] = { ...this.profiles[index], ...profileData };
      return { ...this.profiles[index] };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating candidate profile:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }

  async delete(id) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = this.profiles.findIndex(p => p.Id === parseInt(id));
      if (index === -1) {
        throw new Error(`Profile with Id ${id} not found`);
      }
      this.profiles.splice(index, 1);
      return true;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting candidate profile:", error?.response?.data?.message);
      } else {
        console.error(error);
      }
      throw error;
    }
  }
}

export default new CandidateProfileService();