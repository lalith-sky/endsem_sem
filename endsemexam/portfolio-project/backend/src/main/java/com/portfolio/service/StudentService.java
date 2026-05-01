package com.portfolio.service;

import com.portfolio.entity.Student;
import com.portfolio.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    // Create a new student
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }
    
    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
    
    // Get student by email
    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
    
    // Get student by registration number
    public Student getStudentByRegNo(String regNo) {
        return studentRepository.findByRegNo(regNo);
    }
    
    // Update student
    public Student updateStudent(Long id, Student studentDetails) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            Student existingStudent = student.get();
            if (studentDetails.getName() != null) {
                existingStudent.setName(studentDetails.getName());
            }
            if (studentDetails.getEmail() != null) {
                existingStudent.setEmail(studentDetails.getEmail());
            }
            if (studentDetails.getRegNo() != null) {
                existingStudent.setRegNo(studentDetails.getRegNo());
            }
            if (studentDetails.getDepartment() != null) {
                existingStudent.setDepartment(studentDetails.getDepartment());
            }
            if (studentDetails.getSemester() != null) {
                existingStudent.setSemester(studentDetails.getSemester());
            }
            if (studentDetails.getBio() != null) {
                existingStudent.setBio(studentDetails.getBio());
            }
            if (studentDetails.getPhoneNumber() != null) {
                existingStudent.setPhoneNumber(studentDetails.getPhoneNumber());
            }
            return studentRepository.save(existingStudent);
        }
        return null;
    }
    
    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    
    // Delete all students
    public void deleteAllStudents() {
        studentRepository.deleteAll();
    }
}
