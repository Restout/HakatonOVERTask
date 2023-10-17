package com.example.hakatonovertask.security.controller;

import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import static com.example.hakatonovertask.security.utils.Validator.validate;

@RestController
public class RegistrationController {
    @Autowired
    private UserService userService;

    @PostMapping("/hackathon/registration")
    public ResponseEntity<UserModel> registrateNewUser(@RequestBody UserModel userModel) {
        if (!validate(userModel)) {
            return ResponseEntity
                    .status(400)
                    .body(null);
        }
        Optional<UserModel> model = userService.saveNewUser(userModel);
        if (model.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(model.get());
    }
}
