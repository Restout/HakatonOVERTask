package com.example.hakatonovertask.security.controller;

import com.example.hakatonovertask.security.model.EnroleeModel;
import com.example.hakatonovertask.security.model.EnrolleDao;
import com.example.hakatonovertask.security.utils.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/hackathon/auth/login")
    public ResponseEntity<String> authentication(@RequestBody EnrolleDao user, HttpServletResponse response) {
        //authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String jwtToken = "Bearer " + jwtUtils.generateToken(userDetails);
        response.addHeader(HttpHeaders.AUTHORIZATION, jwtToken);
        if (user != null) {
            return ResponseEntity
                    .ok()
                    .body(jwtUtils.generateToken(userDetails));
        }
        return ResponseEntity
                .badRequest()
                .body("Error");
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
