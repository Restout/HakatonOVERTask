package com.example.hakatonovertask.models.scheldue;

import lombok.Data;

import java.util.Date;

@Data
public class ScheduleInfoToSave {
    private Date day;
    private String lessonName;
    private Date startTime;
    private Date endTime;
    private String location;
    private String organizerLastName;
    private String organizerFirstName;
}
