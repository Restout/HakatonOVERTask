package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.scheldue.ScheduleInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {

    List<ScheldueDayOut> getScheldueByGroupAndDate(Integer groupId, LocalDate startOfWeek);

    ScheldueDayOut saveScheldue(Integer groupId, ScheduleInfoToSave toSave);

    ScheldueDayOut findScheduleById(Integer scheduleId);

    ScheldueDayOut updateScheldueDay(Integer scheldueId, ScheduleInfoToSave scheduleInfoToSave);

    void deleteScheldue(Integer scheldueId);
}
