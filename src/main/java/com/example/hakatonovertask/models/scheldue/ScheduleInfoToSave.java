package com.example.hakatonovertask.models.scheldue;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ScheduleInfoToSave {
    private LocalDate day;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String lessonName;
    private String lessonDescription;
    private String location;
    private String organizerLastName;
    private String organizerFirstName;
}
