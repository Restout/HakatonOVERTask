package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.repositories.ContainerRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.model.UserOut;
import com.example.hakatonovertask.service.ContainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ContainerController {
    @Autowired
    ContainerService containerService;
    @GetMapping("/api/auth/containerStudent")
    public ResponseEntity<List<UserOut>> getContainerStudent(@RequestParam("lessonId")Integer lessonId,@RequestParam("teacherId")Integer teacherId){
        return ResponseEntity.ok().body(containerService.getContainerStudent(lessonId,teacherId));
    }
}
