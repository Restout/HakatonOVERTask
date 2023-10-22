package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Attendance.AttendanceDAO;
import com.example.hakatonovertask.models.Attendance.AttendanceOut;
import com.example.hakatonovertask.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AttendanceController {
    final private AttendanceService attendanceService;

    @GetMapping("/api/auth/attendance/create/{scheduledId}")
    public ResponseEntity<List<AttendanceOut>> getListStudent(@PathVariable int scheduledId) {
        return ResponseEntity.ok().body(attendanceService.getListStudent(scheduledId));
    }

    @GetMapping("/api/auth/attendance/{scheduledId}")
    public ResponseEntity<List<AttendanceDAO>> getAttendance(@PathVariable int scheduledId) {
        return ResponseEntity.ok().body(attendanceService.getAttendacne(scheduledId));
    }

    @PostMapping("/api/auth/attendance/create/{scheduledId}")
    public ResponseEntity<List<AttendanceDAO>> createAttendance(@RequestBody List<AttendanceDAO> list, @PathVariable int scheduledId) {
        return ResponseEntity.ok().body(attendanceService.createAttendance(list, scheduledId));
    }

    @DeleteMapping("/api/auth/attendance/delete/{scheduledId}")
    public ResponseEntity deleteAttendance(@PathVariable int scheduledId) {
        attendanceService.deleteAttendance(scheduledId);
        return ResponseEntity.ok().build();
    }
}
