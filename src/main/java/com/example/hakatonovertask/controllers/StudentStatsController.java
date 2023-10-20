package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Grades;
import com.example.hakatonovertask.service.GradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@PreAuthorize("hasAnyAuthority('ADMIN','SUPERVISOR')")
public class StudentStatsController {
    @Autowired
    GradesService gradesService;

    @GetMapping("api/auth/grades")
    public ResponseEntity<List<Grades>> getAllGradesOfStudents(@RequestParam Integer studentId, @RequestParam int page, @RequestParam int size) {
        try {
            return ResponseEntity
                    .ok()
                    .body(gradesService.getAllGradesByStudentId(studentId, page, size));
        } catch (SQLException e) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }
}
