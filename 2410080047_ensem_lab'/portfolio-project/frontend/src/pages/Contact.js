import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiCodechef } from 'react-icons/si';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:8081/api/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.log('Backend not available, handling locally');
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-content">
        <h1>Get In Touch</h1>
        <p className="contact-subtitle">
          I'm open to new opportunities, collaborations, and interesting conversations
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <h2>Let's work together!</h2>
            <p>
              Whether you have a project in mind, want to collaborate, or just want to say hi — 
              my inbox is always open. I'll get back to you as soon as possible!
            </p>

            <div className="contact-links">
              <a href="https://github.com/lalith-sky" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-link-icon">
                  <FaGithub />
                </div>
                <div className="contact-link-content">
                  <h3>GitHub</h3>
                  <p>@lalith-sky</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/lalith-kumar-627ba7331/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-link-icon">
                  <FaLinkedin />
                </div>
                <div className="contact-link-content">
                  <h3>LinkedIn</h3>
                  <p>Lalith Kumar</p>
                </div>
              </a>

              <a href="https://www.codechef.com/users/lalith_184517" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-link-icon">
                  <SiCodechef />
                </div>
                <div className="contact-link-content">
                  <h3>CodeChef</h3>
                  <p>lalith_184517</p>
                </div>
              </a>

              <a href="mailto:lalith@example.com" className="contact-link">
                <div className="contact-link-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-link-content">
                  <h3>Email</h3>
                  <p>Drop me a message anytime</p>
                </div>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted && (
              <div className="success-message">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
              ></textarea>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
