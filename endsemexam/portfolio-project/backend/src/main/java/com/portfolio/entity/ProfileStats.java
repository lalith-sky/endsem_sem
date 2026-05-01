package com.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "profile_stats")
public class ProfileStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String codechefUsername;

    @Column
    private Integer codechefRating;

    @Column
    private Integer codechefProblemsSolved;

    @Column
    private String githubUsername;

    @Column
    private Integer githubProjectsCount;

    @Column
    private String linkedinProfileUrl;

    @Column
    private Integer linkedinConnections;

    @Column
    private Integer linkedinRequests;

    @Column(columnDefinition = "TEXT")
    private String linkedinFeedText;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onSave() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodechefUsername() {
        return codechefUsername;
    }

    public void setCodechefUsername(String codechefUsername) {
        this.codechefUsername = codechefUsername;
    }

    public Integer getCodechefRating() {
        return codechefRating;
    }

    public void setCodechefRating(Integer codechefRating) {
        this.codechefRating = codechefRating;
    }

    public Integer getCodechefProblemsSolved() {
        return codechefProblemsSolved;
    }

    public void setCodechefProblemsSolved(Integer codechefProblemsSolved) {
        this.codechefProblemsSolved = codechefProblemsSolved;
    }

    public String getGithubUsername() {
        return githubUsername;
    }

    public void setGithubUsername(String githubUsername) {
        this.githubUsername = githubUsername;
    }

    public Integer getGithubProjectsCount() {
        return githubProjectsCount;
    }

    public void setGithubProjectsCount(Integer githubProjectsCount) {
        this.githubProjectsCount = githubProjectsCount;
    }

    public String getLinkedinProfileUrl() {
        return linkedinProfileUrl;
    }

    public void setLinkedinProfileUrl(String linkedinProfileUrl) {
        this.linkedinProfileUrl = linkedinProfileUrl;
    }

    public Integer getLinkedinConnections() {
        return linkedinConnections;
    }

    public void setLinkedinConnections(Integer linkedinConnections) {
        this.linkedinConnections = linkedinConnections;
    }

    public Integer getLinkedinRequests() {
        return linkedinRequests;
    }

    public void setLinkedinRequests(Integer linkedinRequests) {
        this.linkedinRequests = linkedinRequests;
    }

    public String getLinkedinFeedText() {
        return linkedinFeedText;
    }

    public void setLinkedinFeedText(String linkedinFeedText) {
        this.linkedinFeedText = linkedinFeedText;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
