package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.scheldue.ScheldueInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.service.ScheldueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class ScheldueController {
    private ScheldueService scheldueService;
    @Autowired
    public void setScheldueService(ScheldueService scheldueService) {
        this.scheldueService = scheldueService;
    }

    @GetMapping("/scheldue/{groupid}")
    public ResponseEntity<List<ScheldueDayOut>> getScheldue(@PathVariable("groupid") Integer groupid, @RequestParam("date")@DateTimeFormat(pattern="yyyy-MM-dd") Optional<Date> date){
        Date day = date.orElse(null);
        return ResponseEntity.ok(scheldueService.getScheldueByGroupAndDate(groupid,day));
    }
    @PostMapping("/scheldue/{groupid}")
    public ResponseEntity<ScheldueDayOut> saveScheldue(@PathVariable("groupid") Integer groupid, @RequestBody ScheldueInfoToSave scheldueInfoToSave){
        return ResponseEntity.ok().body(scheldueService.saveScheldue(groupid, scheldueInfoToSave));
    }
    @PutMapping("/scheldue/{groupid}")
    public ResponseEntity<ScheldueDayOut> updateScheldue(@PathVariable("groupid") Integer groupid,@RequestBody ScheldueInfoToSave scheldueInfoToSave){
        return ResponseEntity.ok().body(scheldueService.saveScheldue(groupid,scheldueInfoToSave));
    }
    @DeleteMapping("/scheldue/{scheldueId}")
    public void deleteScheldue(@PathVariable("scheldueId")Integer scheldueId){
        scheldueService.deleteScheldue(scheldueId);
    }
}
