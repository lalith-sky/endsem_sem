package com.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import java.util.HashMap;
import java.util.Map;

@Service
public class CodeChefService {
    
    @Value("${codechef.api.base-url}")
    private String codechefBaseUrl;
    
    @Value("${codechef.username}")
    private String codechefUsername;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public Map<String, Object> getUserProfile() {
        Map<String, Object> profile = new HashMap<>();
        
        try {
            String url = codechefBaseUrl + "/" + codechefUsername;
            String html = restTemplate.getForObject(url, String.class);
            Document doc = Jsoup.parse(html);
            
            profile.put("username", codechefUsername);
            profile.put("profile_url", url);
            
            // Try to extract rating (this is a simplified version)
            Element ratingElement = doc.selectFirst(".rating-number");
            if (ratingElement != null) {
                profile.put("rating", ratingElement.text());
            } else {
                profile.put("rating", "N/A");
            }
            
            // Try to extract stars
            Element starsElement = doc.selectFirst(".rating-star");
            if (starsElement != null) {
                profile.put("stars", starsElement.text());
            } else {
                profile.put("stars", "N/A");
            }
            
            // Default values for problems solved
            profile.put("problems_solved", "Check profile for details");
            profile.put("global_rank", "Check profile for details");
            profile.put("country_rank", "Check profile for details");
            
        } catch (Exception e) {
            profile.put("error", "Unable to fetch CodeChef profile. Please check manually.");
            profile.put("username", codechefUsername);
            profile.put("profile_url", codechefBaseUrl + "/" + codechefUsername);
        }
        
        return profile;
    }
    
    public Map<String, Object> getUserStats() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            Map<String, Object> profile = getUserProfile();
            stats.put("username", codechefUsername);
            stats.put("rating", profile.get("rating"));
            stats.put("stars", profile.get("stars"));
            stats.put("profile_url", profile.get("profile_url"));
            
        } catch (Exception e) {
            stats.put("error", "Unable to fetch CodeChef stats");
        }
        
        return stats;
    }
}
