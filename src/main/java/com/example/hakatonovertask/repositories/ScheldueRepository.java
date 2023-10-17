package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ScheldueRepository extends JpaRepository<ScheldueDay, Integer> {
    List<ScheldueDay> getScheldueDaysByGroupGroupIdAndDayBetween(Integer groupid, Date day1,Date day2);
}
