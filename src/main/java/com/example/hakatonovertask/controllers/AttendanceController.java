package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Attendance.AttendanceDAO;
import com.example.hakatonovertask.models.Attendance.AttendanceOut;
import com.example.hakatonovertask.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceController {
    final private AttendanceService attendanceService;

    @GetMapping("/api/attendance/create/{scheduledId}")
    public ResponseEntity<List<AttendanceOut>> getListStudent(@PathVariable int scheduledId) {
        return ResponseEntity.ok().body(attendanceService.getListStudent(scheduledId));
    }

    @GetMapping("/api/attendance/{scheduledId}")
    public ResponseEntity<List<AttendanceDAO>> getAttendance(@PathVariable int scheduledId) {
        return ResponseEntity.ok().body(attendanceService.getAttendacne(scheduledId));
    }





}
