package com.example.hakatonovertask.models.scheldue;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ScheldueDayOut {
    private int scheldueId;
    private LocalDate day;
    private String lessonName;
    private String lessonDescription;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private String firstName;
    private String lastName;
}
