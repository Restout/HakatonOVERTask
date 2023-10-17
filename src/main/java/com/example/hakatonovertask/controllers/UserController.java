package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import com.example.hakatonovertask.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/api/auth/users/all")
    public ResponseEntity<Iterable<UserModel>> getAllUsers(Roles role) {
        if (role == null) {
            return ResponseEntity
                    .ok()
                    .header("user_count", String.valueOf(userService.getCountOfUsers()))
                    .body(userService.getAllUsers());
        }
        try {
            return ResponseEntity
                    .ok()
                    .header("user_count", String.valueOf(userService.getCountOfUsersByRole(role)))
                    .body(userService.getUsersByRole(role));
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
    }


    @PostMapping("/api/auth/users/add")
    public ResponseEntity<UserModel> addUser(@RequestBody UserModel user) {
        Optional<UserModel> userModel = userService.saveNewUser(user);
        if (userModel.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(userService.saveNewUser(user).get());
    }

    @DeleteMapping("/api/auth/users/delete")
    public void deleteUser(@RequestParam int id) {
        userService.deleteUserById(id);
    }
}
