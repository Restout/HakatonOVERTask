package com.example.hakatonovertask.models.scheldue;

import lombok.Data;

import java.util.Date;

@Data
public class ScheldueInfoToSave {
    private Date day;
    private String lesson;
    private Date startTime;
    private Date endTime;
    private int teacherId;
    private String audience;
}
