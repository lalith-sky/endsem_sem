package com.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

@Service
public class GitHubService {
    
    @Value("${github.api.base-url}")
    private String githubApiUrl;
    
    @Value("${github.username}")
    private String githubUsername;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public Map<String, Object> getUserProfile() {
        Map<String, Object> profile = new HashMap<>();
        
        try {
            String url = githubApiUrl + "/users/" + githubUsername;
            String response = restTemplate.getForObject(url, String.class);
            JsonNode userNode = objectMapper.readTree(response);
            
            profile.put("username", githubUsername);
            profile.put("name", userNode.get("name").asText());
            profile.put("bio", userNode.get("bio").asText());
            profile.put("avatar_url", userNode.get("avatar_url").asText());
            profile.put("public_repos", userNode.get("public_repos").asInt());
            profile.put("followers", userNode.get("followers").asInt());
            profile.put("following", userNode.get("following").asInt());
            profile.put("location", userNode.get("location").asText());
            profile.put("blog", userNode.get("blog").asText());
            profile.put("company", userNode.get("company").asText());
            profile.put("created_at", userNode.get("created_at").asText());
            
        } catch (Exception e) {
            profile.put("error", "Unable to fetch GitHub profile: " + e.getMessage());
        }
        
        return profile;
    }
    
    public List<Map<String, Object>> getUserRepositories() {
        List<Map<String, Object>> repos = new ArrayList<>();
        
        try {
            String url = githubApiUrl + "/users/" + githubUsername + "/repos?sort=updated&per_page=10";
            String response = restTemplate.getForObject(url, String.class);
            JsonNode reposNode = objectMapper.readTree(response);
            
            for (JsonNode repo : reposNode) {
                Map<String, Object> repoData = new HashMap<>();
                repoData.put("name", repo.get("name").asText());
                repoData.put("description", repo.has("description") && !repo.get("description").isNull() 
                    ? repo.get("description").asText() : "No description");
                repoData.put("html_url", repo.get("html_url").asText());
                repoData.put("language", repo.has("language") && !repo.get("language").isNull() 
                    ? repo.get("language").asText() : "Unknown");
                repoData.put("stars", repo.get("stargazers_count").asInt());
                repoData.put("forks", repo.get("forks_count").asInt());
                repoData.put("updated_at", repo.get("updated_at").asText());
                repos.add(repoData);
            }
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Unable to fetch repositories: " + e.getMessage());
            repos.add(error);
        }
        
        return repos;
    }
    
    public Map<String, Object> getUserStats() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            // Get user profile for basic stats
            Map<String, Object> profile = getUserProfile();
            stats.put("total_repos", profile.get("public_repos"));
            stats.put("followers", profile.get("followers"));
            stats.put("following", profile.get("following"));
            
            // Get repositories for language stats
            List<Map<String, Object>> repos = getUserRepositories();
            Map<String, Integer> languages = new HashMap<>();
            
            for (Map<String, Object> repo : repos) {
                String language = (String) repo.get("language");
                if (language != null && !language.equals("Unknown")) {
                    languages.put(language, languages.getOrDefault(language, 0) + 1);
                }
            }
            
            stats.put("languages", languages);
            stats.put("most_used_language", languages.isEmpty() ? "N/A" : 
                languages.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .get().getKey());
            
        } catch (Exception e) {
            stats.put("error", "Unable to fetch stats: " + e.getMessage());
        }
        
        return stats;
    }
}
