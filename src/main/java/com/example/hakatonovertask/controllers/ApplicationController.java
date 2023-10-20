package com.example.hakatonovertask.controllers;


import com.example.hakatonovertask.models.applications.ApplicationIn;
import com.example.hakatonovertask.models.applications.ApplicationOut;
import com.example.hakatonovertask.models.applications.ApplicationOutById;
import com.example.hakatonovertask.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/api/applications")
    public ResponseEntity<List<ApplicationOut>> getListApplication(@RequestParam int userId, Pageable pageable){
        List<ApplicationOut> applicationOutList = applicationService.listApplications(userId, pageable);
        return ResponseEntity.ok().header("countApplications", (applicationOutList == null) ? "0" : ""+applicationOutList.size()).body(applicationOutList);
    }

    @GetMapping("/api/auth/application/{id}")
    public ResponseEntity<ApplicationOutById> getApplicationById(@PathVariable int id) {
        var result = applicationService.getApplicationById(id);
        if (result == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/api/auth/application/delete")
    public ResponseEntity deleteApplication(@RequestParam int id){
        applicationService.deleteApplication(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/auth/application/create")
    public ResponseEntity<ApplicationOutById> createApplication(@RequestBody ApplicationIn app){
        try {
            return ResponseEntity.ok().body(applicationService.createApplication(app));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/api/auth/applicatoin/changestatus/{id}")
    public ResponseEntity approveApplication(@PathVariable int id, @RequestParam String answer){
        applicationService.approveApplication(id, answer);
        return ResponseEntity.ok().build();
    }
}
