-- Create database if not exists
CREATE DATABASE IF NOT EXISTS portfolio_db;

-- Use the database
USE portfolio_db;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  reg_no VARCHAR(255) NOT NULL UNIQUE,
  department VARCHAR(100),
  semester VARCHAR(50),
  bio LONGTEXT,
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  description LONGTEXT,
  tech VARCHAR(500),
  github VARCHAR(500),
  live VARCHAR(500),
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create profile stats table
CREATE TABLE IF NOT EXISTS profile_stats (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  codechef_username VARCHAR(255),
  codechef_rating INT,
  codechef_problems_solved INT,
  github_username VARCHAR(255),
  github_projects_count INT,
  linkedin_profile_url VARCHAR(500),
  linkedin_connections INT,
  linkedin_requests INT,
  linkedin_feed_text LONGTEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed sample projects (insert once due unique title)
INSERT IGNORE INTO projects (title, description, tech, github, live, image)
VALUES
  ('E-Commerce Platform', 'Full-stack e-commerce application with React frontend and Spring Boot backend.', 'React, Spring Boot, MySQL, Axios', 'https://github.com/your-username/ecommerce-platform', 'https://example.com/ecommerce', ''),
  ('Portfolio Website', 'Responsive portfolio website showcasing projects and skills.', 'React, CSS3, Responsive Design', 'https://github.com/your-username/portfolio-website', 'https://example.com/portfolio', ''),
  ('Task Management App', 'Simple task manager with CRUD REST APIs.', 'React, Spring Boot, MySQL', 'https://github.com/your-username/task-manager', 'https://example.com/tasks', '');

-- Seed a default profile stats row
INSERT INTO profile_stats (
  codechef_username,
  codechef_rating,
  codechef_problems_solved,
  github_username,
  github_projects_count,
  linkedin_profile_url,
  linkedin_connections,
  linkedin_requests,
  linkedin_feed_text
)
SELECT
  'your-codechef-handle',
  0,
  0,
  'your-github-username',
  0,
  'https://www.linkedin.com/in/your-profile',
  0,
  0,
  'Add your latest LinkedIn update here.'
WHERE NOT EXISTS (SELECT 1 FROM profile_stats);
