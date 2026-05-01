import React from 'react';
import './Home.css';
import { FaArrowDown, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCodechef } from 'react-icons/si';

function Home({ setActiveSection }) {
  const handleExploreWork = () => {
    setActiveSection('projects');
  };

  const handleGetInTouch = () => {
    setActiveSection('contact');
  };

  return (
    <section className="home">
      <div className="home-container">
        <div className="home-content">
          <div className="availability-badge">
            <span className="status-dot"></span>
            Available for opportunities
          </div>
          
          <h1>
            Hi, I'm <span className="highlight">Lalith</span>
          </h1>
          
          <h2 className="home-subtitle">React Enthusiast</h2>
          
          <p className="home-description">
            Passionate developer crafting elegant, high-performance web experiences. 
            I love turning complex problems into simple, beautiful solutions.
          </p>
          
          <div className="home-cta">
            <button className="btn btn-primary" onClick={handleExploreWork}>
              View My Work <FaArrowDown />
            </button>
            <button className="btn btn-secondary" onClick={handleGetInTouch}>
              Get In Touch
            </button>
          </div>
          
          <div className="home-social">
            <a href="https://github.com/lalith-sky" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/lalith-kumar-627ba7331/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="https://www.codechef.com/users/lalith_184517" target="_blank" rel="noopener noreferrer" className="social-icon">
              <SiCodechef />
            </a>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Home;
