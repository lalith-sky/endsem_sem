import React from 'react';
import './Home.css';
import { FaArrowRight } from 'react-icons/fa';

function Home({ setActiveSection }) {
  const handleExploreWork = () => {
    setActiveSection('projects');
  };

  const handleDownloadCV = () => {
    // Placeholder action until a CV file/link is added.
    alert('Please add your CV link/file in Home.js');
  };

  return (
    <section className="home">
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Hi, I'm a Developer</h1>
          <p className="home-subtitle">
            Welcome to my portfolio! I'm a student passionate about building modern web applications
            and solving real-world problems with code.
          </p>
          <div className="home-cta">
            <button className="btn btn-primary" onClick={handleExploreWork}>
              Explore My Work <FaArrowRight />
            </button>
            <button className="btn btn-secondary" onClick={handleDownloadCV}>Download CV</button>
          </div>
        </div>
        <div className="home-image">
          <div className="avatar">
            <h2>💻</h2>
          </div>
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Fast & Responsive</h3>
          <p>Built with modern technologies for optimal performance</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Beautiful Design</h3>
          <p>Clean and modern UI following best practices</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>Creative Solutions</h3>
          <p>Innovative approaches to everyday problems</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
