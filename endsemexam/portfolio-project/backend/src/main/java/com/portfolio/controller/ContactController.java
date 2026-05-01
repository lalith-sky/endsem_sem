package com.portfolio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {
    
    // Handle contact form submissions
    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> handleContact(@RequestBody Map<String, String> contactData) {
        // In a real application, you would save this to database or send an email
        String name = contactData.get("name");
        String email = contactData.get("email");
        String subject = contactData.get("subject");
        String message = contactData.get("message");
        
        // Validate required fields
        if (name == null || email == null || subject == null || message == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "All fields are required");
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
        
        // Log the contact message (in real app, save to DB or send email)
        System.out.println("Contact Form Received:");
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Subject: " + subject);
        System.out.println("Message: " + message);
        
        // Return success response
        Map<String, String> response = new HashMap<>();
        response.put("message", "Contact form submitted successfully");
        response.put("status", "success");
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Portfolio Backend is running");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
