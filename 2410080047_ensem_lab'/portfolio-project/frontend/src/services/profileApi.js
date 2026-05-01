import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const profileApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const profileAPI = {
  // GitHub APIs
  getGitHubProfile: () => profileApi.get('/profile/github'),
  getGitHubRepos: () => profileApi.get('/profile/github/repos'),
  getGitHubStats: () => profileApi.get('/profile/github/stats'),
  
  // CodeChef APIs
  getCodeChefProfile: () => profileApi.get('/profile/codechef'),
  getCodeChefStats: () => profileApi.get('/profile/codechef/stats'),
  
  // LinkedIn API
  getLinkedInProfile: () => profileApi.get('/profile/linkedin'),
  
  // Get all profiles at once
  getAllProfiles: () => profileApi.get('/profile/all'),
};

export default profileApi;
