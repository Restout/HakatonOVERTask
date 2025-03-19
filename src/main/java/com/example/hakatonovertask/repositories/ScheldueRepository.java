package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScheldueRepository extends JpaRepository<ScheduleDay, Integer> {
    List<ScheduleDay> getScheldueDaysByGroupGroupIdAndDayBetween(Integer groupid, LocalDate day1, LocalDate day2);
}
