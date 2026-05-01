import React, { useEffect, useState } from 'react';
import './About.css';
import { profileAPI } from '../services/profileApi';

function About() {
  const [githubData, setGithubData] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [loading, setLoading] = useState(true);

  const skills = [
    { category: 'Frontend', items: ['React', 'HTML/CSS', 'JavaScript', 'Responsive Design'] },
    { category: 'Backend', items: ['Spring Boot', 'Java', 'REST APIs'] },
    { category: 'Tools', items: ['Git', 'VS Code', 'Postman', 'Linux'] },
  ];

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  const fetchAllProfiles = async () => {
    try {
      const response = await profileAPI.getAllProfiles();
      const data = response.data;
      
      setGithubData(data.github);
      setGithubStats(data.github_stats);
      setCodechefData(data.codechef);
      
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="about">
      <div className="about-container">
        <h1>About Me</h1>

        <div className="about-content">
          <div className="about-text">
            <h2>Full Stack Developer & Problem Solver</h2>
            <p>
              {githubData?.bio || "I'm a passionate developer focused on creating clean, efficient, and user-friendly web applications. With a strong foundation in both frontend and backend development, I enjoy building complete full-stack solutions."}
            </p>
            <p>
              I believe in continuous learning and always exploring new technologies to enhance my skills.
              My journey in tech has been about solving problems, learning from challenges, and growing as
              a developer.
            </p>
            {githubData?.location && (
              <p>📍 {githubData.location}</p>
            )}
          </div>

          <div className="skills-section">
            <h2>Skills & Technologies</h2>
            <div className="skills-grid">
              {skills.map((skillGroup, index) => (
                <div key={index} className="skill-category">
                  <h3>{skillGroup.category}</h3>
                  <ul>
                    {skillGroup.items.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat">
            <h3>{githubData?.public_repos || '10+'}</h3>
            <p>GitHub Repos</p>
          </div>
          <div className="stat">
            <h3>{githubData?.followers || '5+'}</h3>
            <p>Followers</p>
          </div>
          <div className="stat">
            <h3>{githubStats?.most_used_language || 'JavaScript'}</h3>
            <p>Top Language</p>
          </div>
        </div>

        <div className="profile-stats-panel">
          <h2>Live Profile Stats</h2>

          {loading ? (
            <p>Loading profile data from GitHub and CodeChef...</p>
          ) : (
            <>
              <div className="live-stats-grid">
                <div className="live-stat-card">
                  <h3>GitHub Repos</h3>
                  <p>{githubData?.public_repos || 0}</p>
                </div>
                <div className="live-stat-card">
                  <h3>GitHub Followers</h3>
                  <p>{githubData?.followers || 0}</p>
                </div>
                <div className="live-stat-card">
                  <h3>GitHub Following</h3>
                  <p>{githubData?.following || 0}</p>
                </div>
                <div className="live-stat-card">
                  <h3>CodeChef Rating</h3>
                  <p>{codechefData?.rating || 'N/A'}</p>
                </div>
                <div className="live-stat-card">
                  <h3>CodeChef Stars</h3>
                  <p>{codechefData?.stars || 'N/A'}</p>
                </div>
              </div>

              <div className="social-links-row">
                <a href={`https://github.com/${githubData?.username || 'lalith-sky'}`} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
                <a href={codechefData?.profile_url || 'https://www.codechef.com/users/lalith_184517'} target="_blank" rel="noopener noreferrer">
                  CodeChef Profile
                </a>
                <a href="https://www.linkedin.com/in/lalith-kumar-627ba7331/" target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </div>

              {githubStats?.languages && (
                <div className="languages-section">
                  <h3>Programming Languages</h3>
                  <div className="languages-grid">
                    {Object.entries(githubStats.languages).map(([lang, count]) => (
                      <div key={lang} className="language-tag">
                        {lang} ({count})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="auto-fetch-note">
                <p>✨ All stats are automatically fetched from GitHub and CodeChef APIs in real-time!</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
