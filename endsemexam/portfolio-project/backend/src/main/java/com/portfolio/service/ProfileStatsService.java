package com.portfolio.service;

import com.portfolio.entity.ProfileStats;
import com.portfolio.repository.ProfileStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileStatsService {

    @Autowired
    private ProfileStatsRepository profileStatsRepository;

    public ProfileStats getOrCreateStats() {
        return profileStatsRepository.findTopByOrderByIdDesc().orElseGet(() -> {
            ProfileStats profileStats = new ProfileStats();
            profileStats.setCodechefUsername("your-codechef-handle");
            profileStats.setCodechefRating(0);
            profileStats.setCodechefProblemsSolved(0);
            profileStats.setGithubUsername("your-github-username");
            profileStats.setGithubProjectsCount(0);
            profileStats.setLinkedinProfileUrl("https://www.linkedin.com/in/your-profile");
            profileStats.setLinkedinConnections(0);
            profileStats.setLinkedinRequests(0);
            profileStats.setLinkedinFeedText("Add your latest LinkedIn update here.");
            return profileStatsRepository.save(profileStats);
        });
    }

    public ProfileStats updateStats(ProfileStats updatedStats) {
        ProfileStats existingStats = getOrCreateStats();

        if (updatedStats.getCodechefUsername() != null) {
            existingStats.setCodechefUsername(updatedStats.getCodechefUsername());
        }
        if (updatedStats.getCodechefRating() != null) {
            existingStats.setCodechefRating(updatedStats.getCodechefRating());
        }
        if (updatedStats.getCodechefProblemsSolved() != null) {
            existingStats.setCodechefProblemsSolved(updatedStats.getCodechefProblemsSolved());
        }
        if (updatedStats.getGithubUsername() != null) {
            existingStats.setGithubUsername(updatedStats.getGithubUsername());
        }
        if (updatedStats.getGithubProjectsCount() != null) {
            existingStats.setGithubProjectsCount(updatedStats.getGithubProjectsCount());
        }
        if (updatedStats.getLinkedinProfileUrl() != null) {
            existingStats.setLinkedinProfileUrl(updatedStats.getLinkedinProfileUrl());
        }
        if (updatedStats.getLinkedinConnections() != null) {
            existingStats.setLinkedinConnections(updatedStats.getLinkedinConnections());
        }
        if (updatedStats.getLinkedinRequests() != null) {
            existingStats.setLinkedinRequests(updatedStats.getLinkedinRequests());
        }
        if (updatedStats.getLinkedinFeedText() != null) {
            existingStats.setLinkedinFeedText(updatedStats.getLinkedinFeedText());
        }

        return profileStatsRepository.save(existingStats);
    }
}
