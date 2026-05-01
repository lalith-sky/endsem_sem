package com.portfolio.controller;

import com.portfolio.service.GitHubService;
import com.portfolio.service.CodeChefService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:3001")
public class ProfileController {
    
    @Autowired
    private GitHubService gitHubService;
    
    @Autowired
    private CodeChefService codeChefService;
    
    @Value("${linkedin.profile.url}")
    private String linkedinProfileUrl;
    
    @GetMapping("/github")
    public Map<String, Object> getGitHubProfile() {
        return gitHubService.getUserProfile();
    }
    
    @GetMapping("/github/repos")
    public List<Map<String, Object>> getGitHubRepos() {
        return gitHubService.getUserRepositories();
    }
    
    @GetMapping("/github/stats")
    public Map<String, Object> getGitHubStats() {
        return gitHubService.getUserStats();
    }
    
    @GetMapping("/codechef")
    public Map<String, Object> getCodeChefProfile() {
        return codeChefService.getUserProfile();
    }
    
    @GetMapping("/codechef/stats")
    public Map<String, Object> getCodeChefStats() {
        return codeChefService.getUserStats();
    }
    
    @GetMapping("/linkedin")
    public Map<String, Object> getLinkedInProfile() {
        Map<String, Object> profile = new HashMap<>();
        profile.put("profile_url", linkedinProfileUrl);
        profile.put("note", "LinkedIn requires OAuth authentication for API access");
        return profile;
    }
    
    @GetMapping("/all")
    public Map<String, Object> getAllProfiles() {
        Map<String, Object> allProfiles = new HashMap<>();
        
        allProfiles.put("github", gitHubService.getUserProfile());
        allProfiles.put("github_stats", gitHubService.getUserStats());
        allProfiles.put("codechef", codeChefService.getUserProfile());
        allProfiles.put("linkedin_url", linkedinProfileUrl);
        
        return allProfiles;
    }
}
