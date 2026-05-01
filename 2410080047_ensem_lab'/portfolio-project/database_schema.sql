-- Database Schema for Portfolio Application
-- Run this SQL script to create the database and tables

-- Create Database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    reg_no VARCHAR(50) NOT NULL UNIQUE,
    department VARCHAR(100),
    semester VARCHAR(50),
    bio TEXT,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    tech VARCHAR(500),
    github VARCHAR(255),
    live VARCHAR(255),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Sample Students
INSERT INTO students (name, email, reg_no, department, semester, bio, phone_number) 
VALUES 
('John Doe', 'john@example.com', 'REG001', 'Computer Science', '6', 'Passionate developer', '9876543210'),
('Jane Smith', 'jane@example.com', 'REG002', 'Computer Science', '6', 'Full-stack enthusiast', '9876543211');

-- Insert Sample Projects
INSERT INTO projects (title, description, tech, github, live) 
VALUES 
('E-Commerce Platform', 'Full-stack e-commerce with React & Spring Boot', 'React,Spring Boot,MySQL', 'https://github.com', 'https://example.com'),
('Task Manager', 'Simple task management application', 'React,Node.js,MongoDB', 'https://github.com', 'https://example.com');
