package com.portfolio.service;

import com.portfolio.entity.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    // Create a new project
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
    
    // Get all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    // Get project by ID
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    
    // Get project by title
    public Project getProjectByTitle(String title) {
        return projectRepository.findByTitle(title);
    }
    
    // Update project
    public Project updateProject(Long id, Project projectDetails) {
        Optional<Project> project = projectRepository.findById(id);
        if (project.isPresent()) {
            Project existingProject = project.get();
            if (projectDetails.getTitle() != null) {
                existingProject.setTitle(projectDetails.getTitle());
            }
            if (projectDetails.getDescription() != null) {
                existingProject.setDescription(projectDetails.getDescription());
            }
            if (projectDetails.getTech() != null) {
                existingProject.setTech(projectDetails.getTech());
            }
            if (projectDetails.getGithub() != null) {
                existingProject.setGithub(projectDetails.getGithub());
            }
            if (projectDetails.getLive() != null) {
                existingProject.setLive(projectDetails.getLive());
            }
            if (projectDetails.getImage() != null) {
                existingProject.setImage(projectDetails.getImage());
            }
            return projectRepository.save(existingProject);
        }
        return null;
    }
    
    // Delete project
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    
    // Delete all projects
    public void deleteAllProjects() {
        projectRepository.deleteAll();
    }
}
