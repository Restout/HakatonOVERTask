package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.scheldue.ScheldueInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.repositories.ScheldueRepository;
import com.example.hakatonovertask.service.ScheldueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @GetMapping("/api/scheldue/{groupid}")
    public ResponseEntity<List<ScheldueDayOut>> getScheldue(@PathVariable("groupid") Integer groupid, @RequestParam("date")@DateTimeFormat(pattern="yyyy-MM-dd") Optional<Date> date){
        Date day = date.orElse(null);
        return ResponseEntity.ok(scheldueService.getScheldueByGroupAndDate(groupid,day));
    }
    @GetMapping("/api/scheldue")
    public ResponseEntity<ScheldueDayOut> getScheduleById(@RequestParam("scheduleId")Integer scheduleId){
        return ResponseEntity.ok(scheldueService.scheldueDayToOut(scheduleId));
    }
    @PostMapping("/api/auth/scheldue/{groupid}")
    @PreAuthorize("hasAnyAuthority('ADMIN','SUPERVISOR')")
    public ResponseEntity<ScheldueDayOut> saveScheldue(@PathVariable("groupid") Integer groupid, @RequestBody ScheldueInfoToSave scheldueInfoToSave){
        return ResponseEntity.ok().body(scheldueService.saveScheldue(groupid, scheldueInfoToSave));
    }
    @PutMapping("/api/auth/scheldue/{scheldueId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','SUPERVISOR')")

    public ResponseEntity<ScheldueDayOut> updateScheldue(@PathVariable("scheldueId") Integer scheldueId,@RequestBody ScheldueInfoToSave scheldueInfoToSave){
        return ResponseEntity.ok().body(scheldueService.updateScheldueDay(scheldueId, scheldueInfoToSave));
    }
    @DeleteMapping("/api/auth/scheldue/{scheldueId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','SUPERVISOR')")

    public void deleteScheldue(@PathVariable("scheldueId")Integer scheldueId){
        scheldueService.deleteScheldue(scheldueId);
    }
}
