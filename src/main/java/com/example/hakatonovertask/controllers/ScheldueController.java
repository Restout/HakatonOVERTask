package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.scheldue.ScheduleInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import static java.util.Objects.isNull;

@RestController
@RequiredArgsConstructor
public class ScheldueController {
    private final ScheduleService scheldueService;

    @GetMapping("/api/schedule/{groupId}")
    public List<ScheldueDayOut> getWeekScheldue(@PathVariable("groupId") Integer groupid, @RequestParam(value = "date", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startWeekDate) {
        if(isNull(startWeekDate)){
            startWeekDate = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        }

        return scheldueService.getScheldueByGroupAndDate(groupid, startWeekDate);
    }

    @GetMapping("/api/schedule")
    public ScheldueDayOut getScheduleById(@RequestParam("scheduleId") Integer scheduleId) {
        return scheldueService.findScheduleById(scheduleId);
    }

    @PostMapping("/api/auth/schedule/{groupId}")
    public ScheldueDayOut saveScheldue(@PathVariable("groupId") Integer groupid, @RequestBody ScheduleInfoToSave scheduleInfoToSave) {
        return scheldueService.saveScheldue(groupid, scheduleInfoToSave);
    }

    @PutMapping("/api/auth/schedule/{scheduleId}")
    public ScheldueDayOut updateScheldue(@PathVariable("scheduleId") Integer scheldueId, @RequestBody ScheduleInfoToSave scheduleInfoToSave) {
        return scheldueService.updateScheldueDay(scheldueId, scheduleInfoToSave);
    }

    @DeleteMapping("/api/auth/schedule/{scheduleId}")
    public void deleteScheldue(@PathVariable("scheldueId") Integer scheldueId) {
        scheldueService.deleteScheldue(scheldueId);
    }
}
