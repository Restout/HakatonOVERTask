package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.scheldue.ScheldueInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.service.ScheldueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScheldueController {
    private ScheldueService scheldueService;
    @Autowired
    public void setScheldueService(ScheldueService scheldueService) {
        this.scheldueService = scheldueService;
    }

    @GetMapping("/scheldue/{groupid}")
    public ResponseEntity<List<ScheldueDayOut>> getSheldue(@PathVariable("groupid") Integer groupid){
        return ResponseEntity.ok(scheldueService.getScheldueByGroup(groupid));
    }
    @PostMapping("/scheldue/{groupid}")
    public ResponseEntity<ScheldueDayOut> saveSheldue(@PathVariable("groupid") Integer groupid, @RequestBody ScheldueInfoToSave scheldueInfoToSave){
        return ResponseEntity.ok().body(scheldueService.saveScheldue(groupid, scheldueInfoToSave));
    }
}
