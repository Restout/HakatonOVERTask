package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Attendance.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    List<Attendance> findAllByScheduleDayScheldueId(int scheldueId);
}
