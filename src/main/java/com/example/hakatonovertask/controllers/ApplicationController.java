package com.example.hakatonovertask.controllers;


import com.example.hakatonovertask.models.applications.Application;
import com.example.hakatonovertask.models.applications.ApplicationIn;
import com.example.hakatonovertask.models.applications.ApplicationOut;
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

    @GetMapping("/applications/{id}")
    public ResponseEntity<ApplicationOut> getApplicatoinById(@PathVariable int id) {
        var result = applicationService.getApplicationById(id);
        if (result == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/applications/delete")
    public void deleteApplication(@RequestParam int id){applicationService.deleteApplication(id);}

    @PostMapping("/applications/create")
    public ResponseEntity<ApplicationOut> createApplication(@RequestBody ApplicationIn app){
        return ResponseEntity.ok().body(applicationService.createApplication(app));
    }
}
