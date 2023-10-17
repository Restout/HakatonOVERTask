package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.SelectionCommittee;
import com.example.hakatonovertask.repositories.users.SelectionCommiteeJpaRepository;
import com.example.hakatonovertask.service.users.SelectionCommiteeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController

public class SelectionCommiteeController implements BaseUserController<SelectionCommittee, Integer> {
    @Autowired
    SelectionCommiteeService selectionCommiteeService;
    @Autowired
    SelectionCommiteeJpaRepository selectionCommiteeJpaRepository;

    @Override
    @GetMapping("/api/auth/user/data/student")
    public ResponseEntity<Iterable<SelectionCommittee>> getAllRoleUsers() {
        return ResponseEntity
                .ok()
                .body(selectionCommiteeJpaRepository.findAll());
    }

    @Override
    @PostMapping("/api/auth/user/set/student")
    public ResponseEntity<SelectionCommittee> creatRoleUser(@RequestBody SelectionCommittee role) {
        return ResponseEntity
                .ok()
                .body(selectionCommiteeService.saveSelComm(role).get());
    }

    @Override
    @PutMapping("/api/auth/user/grand/student")
    public ResponseEntity<SelectionCommittee> grandUserToRole(@RequestBody Integer roleDao) {
        SelectionCommittee student;
        try {
            student = selectionCommiteeService.creatSelComFromUserAndSave(roleDao).get();
        } catch (SQLException e) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(student);
    }

    @Override
    @DeleteMapping("/api/auth/user/delete/student")
    public void deleteRoleUserById(@RequestParam int id) {
    }
}
