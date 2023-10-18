package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.Enrollee;
import com.example.hakatonovertask.repositories.users.EnroleeJpaRepository;
import com.example.hakatonovertask.service.users.EnrolleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@PreAuthorize("hasAuthority('ADMIN')")
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

    @GetMapping("/api/auth/user/data/enrolle")
    public ResponseEntity<Iterable<Enrollee>> getAllEnrollee() {
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
