import React, { useState, useEffect, useCallback } from 'react';
import './Projects.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectAPI } from '../services/api';

const staticProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce application with React frontend and Spring Boot backend',
    tech: ['React', 'Spring Boot', 'MySQL', 'Axios'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'Responsive portfolio website showcasing projects and skills',
    tech: ['React', 'CSS3', 'Responsive Design'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Simple yet effective task management application with REST APIs',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    github: '',
    live: '',
    image: '',
  });

  const normalizeTech = (tech) => {
    if (Array.isArray(tech)) return tech;
    if (typeof tech === 'string') {
      return tech
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  };

  const fetchProjects = useCallback(async () => {
    try {
      // Try to fetch from backend, fallback to static projects
      const response = await projectAPI.getAllProjects();
      setProjects(response.data);
    } catch (err) {
      console.log('Backend not available, using static projects');
      setProjects(staticProjects);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      await projectAPI.createProject(formData);
      setMessage('Project added successfully and saved to database.');
      setFormData({
        title: '',
        description: '',
        tech: '',
        github: '',
        live: '',
        image: '',
      });
      await fetchProjects();
    } catch (err) {
      setMessage('Failed to add project. Check title uniqueness and backend status.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <section className="projects"><p>Loading projects...</p></section>;
  }

  return (
    <section className="projects">
      <div className="projects-container">
        <h1>My Projects</h1>
        <p className="section-subtitle">Here are some of my recent projects</p>

        <div className="project-form-card">
          <h2>Add New Project</h2>
          <form className="project-form" onSubmit={handleAddProject}>
            <input
              type="text"
              name="title"
              placeholder="Project title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Project description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
            <input
              type="text"
              name="tech"
              placeholder="Tech stack (comma separated)"
              value={formData.tech}
              onChange={handleChange}
              required
            />
            <input
              type="url"
              name="github"
              placeholder="GitHub project URL"
              value={formData.github}
              onChange={handleChange}
            />
            <input
              type="url"
              name="live"
              placeholder="Live demo URL"
              value={formData.live}
              onChange={handleChange}
            />
            <input
              type="url"
              name="image"
              placeholder="Image URL (optional)"
              value={formData.image}
              onChange={handleChange}
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Add Project'}
            </button>
          </form>
          {message && <p className="project-form-message">{message}</p>}
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {normalizeTech(project.tech).map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                ))}
              </div>
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
