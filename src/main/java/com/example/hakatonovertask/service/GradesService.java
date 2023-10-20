package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Grades;
import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.repositories.GradeJDBCRepository;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class GradesService {
    @Autowired
    private GradeJDBCRepository gradeJDBCRepository;
    @Autowired
    private StudentJpaRepository studentJpaRepository;

    public List<Grades> getAllGradesByStudentId(int studentId, int page, int limit) throws SQLException {
        Optional<Student> student = studentJpaRepository.findById(studentId);
        if (student.isEmpty()) {
            throw new SQLException("No such Student");
        }
        page--;
        return gradeJDBCRepository.getGradesByStudentId(studentId, page, limit);
    }
}
