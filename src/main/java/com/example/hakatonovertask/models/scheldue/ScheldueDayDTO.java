package com.example.hakatonovertask.models.scheldue;

import lombok.Data;

import java.util.Date;

@Data
public class ScheldueDayDTO {

    private Date day;
    private String Lesson;
    private Date startTime;
    private Date endTime;
    private String groupId;
    private String audience;
    private String firstName;
    private String lastname;
}
