package com.portfolio.controller;

import com.portfolio.entity.ProfileStats;
import com.portfolio.service.ProfileStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile-stats")
public class ProfileStatsController {

    @Autowired
    private ProfileStatsService profileStatsService;

    @GetMapping
    public ResponseEntity<ProfileStats> getProfileStats() {
        return new ResponseEntity<>(profileStatsService.getOrCreateStats(), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ProfileStats> updateProfileStats(@RequestBody ProfileStats profileStats) {
        return new ResponseEntity<>(profileStatsService.updateStats(profileStats), HttpStatus.OK);
    }
}
