package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.security.model.Enrollee;
import com.example.hakatonovertask.security.repository.EnroleeJpaRepository;
import com.example.hakatonovertask.service.EnrolleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
public class EnrolleeController {
    @Autowired
    EnroleeJpaRepository enroleeJpaRepository;
    @Autowired
    EnrolleService enrolleService;

    @PutMapping("/api/auth/user/grand/enrolle")
    public ResponseEntity<Enrollee> grandToEnrollee(@RequestParam int id) {
        Enrollee enrollee;
        try {
            enrollee = enrolleService.creatEnrolleFromeUserAndSave(id).get();
        } catch (SQLException e) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(enrollee);
    }

    @PostMapping("/api/auth/user/set/enrolle")
    public ResponseEntity<Enrollee> creatNewEnrollee(@RequestBody Enrollee enrollee) {
        return ResponseEntity
                .ok()
                .body(enrolleService.saveEnrolle(enrollee).get());
    }

    @GetMapping("/api/auth/user/grand/enrolle")
    public ResponseEntity<List<Enrollee>> getAllEnrollee() {
        return ResponseEntity
                .ok()
                .body(enroleeJpaRepository.findAll());
    }

    @DeleteMapping("/api/auth/user/delete/enrolle")
    public void deleteEnrollee(@RequestParam int id) {
        enrolleService.deleteEnrolleeByID(id);
        ResponseEntity
                .ok();
    }
}
