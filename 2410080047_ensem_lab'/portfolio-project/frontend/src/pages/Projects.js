import React, { useState, useEffect } from 'react';
import './Projects.css';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { profileAPI } from '../services/profileApi';

function Projects() {
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      const response = await profileAPI.getGitHubRepos();
      setGithubRepos(response.data);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className="projects">
      <div className="projects-container">
        <h1>MY PROJECTS</h1>
        <p className="section-subtitle">
          Here are some of my recent projects automatically fetched from GitHub
        </p>

        {loading ? (
          <div className="loading-message">
            <p>Loading projects from GitHub...</p>
          </div>
        ) : (
          <div className="projects-grid">
            {githubRepos.map((repo, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h3>{repo.name}</h3>
                </div>
                
                <p className="project-description">
                  {repo.description || 'No description available'}
                </p>
                
                <div className="project-meta">
                  <span className="project-language">
                    {repo.language || 'Code'}
                  </span>
                  <span className="project-stats">
                    <FaStar /> {repo.stars}
                  </span>
                  <span className="project-stats">
                    <FaCodeBranch /> {repo.forks}
                  </span>
                </div>
                
                <div className="project-footer">
                  <span className="project-date">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaGithub /> View Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="auto-fetch-note">
          <p>✨ All projects are automatically fetched from GitHub in real-time!</p>
        </div>
      </div>
    </section>
  );
}

export default Projects;
