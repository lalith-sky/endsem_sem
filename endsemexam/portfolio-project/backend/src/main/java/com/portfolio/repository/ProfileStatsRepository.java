package com.portfolio.repository;

import com.portfolio.entity.ProfileStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileStatsRepository extends JpaRepository<ProfileStats, Long> {
    Optional<ProfileStats> findTopByOrderByIdDesc();
}
