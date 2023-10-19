package com.example.hakatonovertask.security.controller;

import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserDao;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private UserJpaRepository userJpaRepository;


    @PostMapping("/api/login")
    public ResponseEntity<UserDetails> authentication(@RequestBody UserDao user, HttpServletResponse response) {
        //authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        UserModel userModel = userJpaRepository.findByEmail(user.getEmail());
        String jwtToken = "Bearer " + jwtUtils.generateToken(userModel);
        response.addHeader(HttpHeaders.AUTHORIZATION, jwtToken);
        if (user != null) {
            return ResponseEntity
                    .ok()
                    .body(userModel);
        }
        return ResponseEntity
                .badRequest()
                .build();
    }

    @GetMapping("/api/refresh")
    public ResponseEntity<UserModel> refreshToken(@RequestParam String token) {
        String email = jwtUtils.extractUsername(token);
        UserModel userModel = userJpaRepository.findByEmail(email);
        if (!jwtUtils.validateToken(token, userModel)) {
            return ResponseEntity
                    .status(401)
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(userModel);
    }
}
