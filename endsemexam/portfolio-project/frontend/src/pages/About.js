import React, { useEffect, useState } from 'react';
import './About.css';
import { profileStatsAPI } from '../services/api';

function About() {
  const [profileStats, setProfileStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [savingStats, setSavingStats] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [statsForm, setStatsForm] = useState({
    codechefUsername: '',
    codechefRating: 0,
    codechefProblemsSolved: 0,
    githubUsername: '',
    githubProjectsCount: 0,
    linkedinProfileUrl: '',
    linkedinConnections: 0,
    linkedinRequests: 0,
    linkedinFeedText: '',
  });

  const skills = [
    { category: 'Frontend', items: ['React', 'HTML/CSS', 'JavaScript', 'Responsive Design'] },
    { category: 'Backend', items: ['Spring Boot', 'Java', 'REST APIs', 'MySQL'] },
    { category: 'Tools', items: ['Git', 'VS Code', 'Postman', 'Linux'] },
  ];

  useEffect(() => {
    fetchProfileStats();
  }, []);

  const fetchProfileStats = async () => {
    try {
      const response = await profileStatsAPI.getProfileStats();
      const data = response.data;
      setProfileStats(data);
      setStatsForm({
        codechefUsername: data.codechefUsername || '',
        codechefRating: data.codechefRating || 0,
        codechefProblemsSolved: data.codechefProblemsSolved || 0,
        githubUsername: data.githubUsername || '',
        githubProjectsCount: data.githubProjectsCount || 0,
        linkedinProfileUrl: data.linkedinProfileUrl || '',
        linkedinConnections: data.linkedinConnections || 0,
        linkedinRequests: data.linkedinRequests || 0,
        linkedinFeedText: data.linkedinFeedText || '',
      });
    } catch (error) {
      setSaveMessage('Unable to load social stats from backend.');
    } finally {
      setLoadingStats(false);
    }
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setStatsForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatsSave = async (e) => {
    e.preventDefault();
    setSavingStats(true);
    setSaveMessage('');

    try {
      const payload = {
        ...statsForm,
        codechefRating: Number(statsForm.codechefRating) || 0,
        codechefProblemsSolved: Number(statsForm.codechefProblemsSolved) || 0,
        githubProjectsCount: Number(statsForm.githubProjectsCount) || 0,
        linkedinConnections: Number(statsForm.linkedinConnections) || 0,
        linkedinRequests: Number(statsForm.linkedinRequests) || 0,
      };

      const response = await profileStatsAPI.updateProfileStats(payload);
      setProfileStats(response.data);
      setSaveMessage('Stats saved to database successfully.');
    } catch (error) {
      setSaveMessage('Failed to save stats. Please check backend connection.');
    } finally {
      setSavingStats(false);
    }
  };

  return (
    <section className="about">
      <div className="about-container">
        <h1>About Me</h1>

        <div className="about-content">
          <div className="about-text">
            <h2>Student Developer & Tech Enthusiast</h2>
            <p>
              I'm a passionate student developer focused on creating clean, efficient, and user-friendly
              web applications. With a strong foundation in both frontend and backend development, I enjoy
              building complete full-stack solutions.
            </p>
            <p>
              I believe in continuous learning and always exploring new technologies to enhance my skills.
              My journey in tech has been about solving problems, learning from challenges, and growing as
              a developer.
            </p>
          </div>

          <div className="skills-section">
            <h2>Skills</h2>
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
            <h3>10+</h3>
            <p>Projects</p>
          </div>
          <div className="stat">
            <h3>1+</h3>
            <p>Years</p>
          </div>
          <div className="stat">
            <h3>5+</h3>
            <p>Technologies</p>
          </div>
        </div>

        <div className="profile-stats-panel">
          <h2>CodeChef, GitHub & LinkedIn</h2>

          {loadingStats ? (
            <p>Loading profile stats...</p>
          ) : (
            <>
              <div className="live-stats-grid">
                <div className="live-stat-card">
                  <h3>CodeChef Rating</h3>
                  <p>{profileStats?.codechefRating ?? 0}</p>
                </div>
                <div className="live-stat-card">
                  <h3>Problems Solved</h3>
                  <p>{profileStats?.codechefProblemsSolved ?? 0}</p>
                </div>
                <div className="live-stat-card">
                  <h3>GitHub Projects</h3>
                  <p>{profileStats?.githubProjectsCount ?? 0}</p>
                </div>
                <div className="live-stat-card">
                  <h3>LinkedIn Connections</h3>
                  <p>{profileStats?.linkedinConnections ?? 0}</p>
                </div>
                <div className="live-stat-card">
                  <h3>LinkedIn Requests</h3>
                  <p>{profileStats?.linkedinRequests ?? 0}</p>
                </div>
              </div>

              <div className="social-links-row">
                {profileStats?.codechefUsername && (
                  <a href={`https://www.codechef.com/users/${profileStats.codechefUsername}`} target="_blank" rel="noopener noreferrer">
                    CodeChef Profile
                  </a>
                )}
                {profileStats?.githubUsername && (
                  <a href={`https://github.com/${profileStats.githubUsername}`} target="_blank" rel="noopener noreferrer">
                    GitHub Profile
                  </a>
                )}
                {profileStats?.linkedinProfileUrl && (
                  <a href={profileStats.linkedinProfileUrl} target="_blank" rel="noopener noreferrer">
                    LinkedIn Profile
                  </a>
                )}
              </div>

              <div className="linkedin-feed-box">
                <h3>LinkedIn Feed Highlight</h3>
                <p>{profileStats?.linkedinFeedText || 'No feed highlight added yet.'}</p>
              </div>

              <form className="stats-form" onSubmit={handleStatsSave}>
                <h3>Update Social Stats (Saved in Database)</h3>

                <input
                  type="text"
                  name="codechefUsername"
                  placeholder="CodeChef username"
                  value={statsForm.codechefUsername}
                  onChange={handleStatsChange}
                />
                <input
                  type="number"
                  name="codechefRating"
                  placeholder="CodeChef rating"
                  value={statsForm.codechefRating}
                  onChange={handleStatsChange}
                />
                <input
                  type="number"
                  name="codechefProblemsSolved"
                  placeholder="CodeChef problems solved"
                  value={statsForm.codechefProblemsSolved}
                  onChange={handleStatsChange}
                />
                <input
                  type="text"
                  name="githubUsername"
                  placeholder="GitHub username"
                  value={statsForm.githubUsername}
                  onChange={handleStatsChange}
                />
                <input
                  type="number"
                  name="githubProjectsCount"
                  placeholder="GitHub project count"
                  value={statsForm.githubProjectsCount}
                  onChange={handleStatsChange}
                />
                <input
                  type="url"
                  name="linkedinProfileUrl"
                  placeholder="LinkedIn profile URL"
                  value={statsForm.linkedinProfileUrl}
                  onChange={handleStatsChange}
                />
                <input
                  type="number"
                  name="linkedinConnections"
                  placeholder="LinkedIn connections"
                  value={statsForm.linkedinConnections}
                  onChange={handleStatsChange}
                />
                <input
                  type="number"
                  name="linkedinRequests"
                  placeholder="LinkedIn requests"
                  value={statsForm.linkedinRequests}
                  onChange={handleStatsChange}
                />
                <textarea
                  name="linkedinFeedText"
                  rows="3"
                  placeholder="LinkedIn feed/update text"
                  value={statsForm.linkedinFeedText}
                  onChange={handleStatsChange}
                />

                <button type="submit" disabled={savingStats}>
                  {savingStats ? 'Saving...' : 'Save Social Stats'}
                </button>
                {saveMessage && <p className="stats-message">{saveMessage}</p>}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
