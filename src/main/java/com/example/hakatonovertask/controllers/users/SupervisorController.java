package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.Supervisor;
import com.example.hakatonovertask.repositories.users.SupervisorJpaRepository;
import com.example.hakatonovertask.service.users.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@PreAuthorize("hasAuthority('Admin')")
public class SupervisorController implements BaseUserController<Supervisor, Integer> {
    @Autowired
    SupervisorService supervisorService;
    @Autowired
    SupervisorJpaRepository supervisorJpaRepository;

    @Override
    @GetMapping("/api/auth/user/data/supervisor")
    public ResponseEntity<Iterable<Supervisor>> getAllRoleUsers() {
        return ResponseEntity
                .ok()
                .body(supervisorJpaRepository.findAll());
    }

    @Override
    @PostMapping("/api/auth/user/set/supervisor")
    public ResponseEntity<Supervisor> creatRoleUser(@RequestBody Supervisor role) {
        return ResponseEntity
                .ok()
                .body(supervisorService.saveSupervisor(role).get());
    }

    @Override
    @PutMapping("/api/auth/user/grand/supervisor")
    public ResponseEntity<Supervisor> grandUserToRole(@RequestParam Integer roleId) {
        Supervisor supervisor;
        try {
            supervisor = supervisorService.creatSupervisorFromUserAndSave(roleId).get();
        } catch (SQLException e) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(supervisor);
    }

    @Override
    public void deleteRoleUserById(int id) {

    }
}
