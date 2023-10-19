package com.example.hakatonovertask.controllers;


import com.example.hakatonovertask.models.applications.ApplicationIn;
import com.example.hakatonovertask.models.applications.ApplicationOut;
import com.example.hakatonovertask.models.applications.ApplicationOutById;
import com.example.hakatonovertask.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationOut>> getListApplication(){
        return ResponseEntity.ok().body(applicationService.listApplications());
    }

    @GetMapping("/application/{id}")
    public ResponseEntity<ApplicationOutById> getApplicatoinById(@PathVariable int id) {
        var result = applicationService.getApplicationById(id);
        if (result == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/application/delete")
    public ResponseEntity deleteApplication(@RequestParam int id){
        applicationService.deleteApplication(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/application/create")
    public ResponseEntity<ApplicationOutById> createApplication(@RequestBody ApplicationIn app){
        try {
            return ResponseEntity.ok().body(applicationService.createApplication(app));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/applicatoin/changestatus/{id}")
    public ResponseEntity approveApplicatoin(@PathVariable int id, @RequestParam String answer){
        applicationService.approveApplication(id, answer);
        return ResponseEntity.ok().build();
    }
}
