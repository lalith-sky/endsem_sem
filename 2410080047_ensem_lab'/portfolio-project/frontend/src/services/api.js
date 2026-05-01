import axios from 'axios';

// Configure API base URL - uses environment variable in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== Student APIs ====================

export const studentAPI = {
  // Create a new student
  createStudent: (studentData) => apiClient.post('/students', studentData),
  
  // Get all students
  getAllStudents: () => apiClient.get('/students'),
  
  // Get student by ID
  getStudentById: (id) => apiClient.get(`/students/${id}`),
  
  // Get student by email
  getStudentByEmail: (email) => apiClient.get(`/students/email/${email}`),
  
  // Get student by registration number
  getStudentByRegNo: (regNo) => apiClient.get(`/students/regno/${regNo}`),
  
  // Update student
  updateStudent: (id, studentData) => apiClient.put(`/students/${id}`, studentData),
  
  // Delete student
  deleteStudent: (id) => apiClient.delete(`/students/${id}`),
};

// ==================== Project APIs ====================

export const projectAPI = {
  // Create a new project
  createProject: (projectData) => apiClient.post('/projects', projectData),
  
  // Get all projects
  getAllProjects: () => apiClient.get('/projects'),
  
  // Get project by ID
  getProjectById: (id) => apiClient.get(`/projects/${id}`),
  
  // Get project by title
  getProjectByTitle: (title) => apiClient.get(`/projects/title/${title}`),
  
  // Update project
  updateProject: (id, projectData) => apiClient.put(`/projects/${id}`, projectData),
  
  // Delete project
  deleteProject: (id) => apiClient.delete(`/projects/${id}`),
};

// ==================== Profile Stats API ====================

export const profileStatsAPI = {
  // Get profile stats
  getProfileStats: () => apiClient.get('/profile-stats'),

  // Update profile stats
  updateProfileStats: (statsData) => apiClient.put('/profile-stats', statsData),
};

// ==================== Contact API ====================

export const contactAPI = {
  // Send contact form
  sendContactForm: (contactData) => apiClient.post('/contact', contactData),
};

// ==================== Health Check ====================

export const healthAPI = {
  // Check if backend is running
  checkHealth: () => apiClient.get('/health'),
};

export default apiClient;
