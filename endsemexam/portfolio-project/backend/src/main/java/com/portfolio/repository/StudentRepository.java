package com.portfolio.repository;

import com.portfolio.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Find student by email
    Student findByEmail(String email);
    
    // Find student by registration number
    Student findByRegNo(String regNo);
}
