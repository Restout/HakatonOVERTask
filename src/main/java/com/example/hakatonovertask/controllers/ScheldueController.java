package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.scheldue.ScheldueDayDTO;
import com.example.hakatonovertask.service.ScheldueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScheldueController {
    private ScheldueService scheldueService;
    @Autowired
    public void setScheldueService(ScheldueService scheldueService) {
        this.scheldueService = scheldueService;
    }

    @GetMapping("/scheldue/{groupid}")
    public ResponseEntity<List<ScheldueDayDTO>> getSheldue(@PathVariable("groupid") Integer groupid){
        return ResponseEntity.ok(scheldueService.getScheldueByGroup(groupid));
    }
}
