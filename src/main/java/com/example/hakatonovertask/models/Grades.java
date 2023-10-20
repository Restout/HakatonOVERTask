package com.example.hakatonovertask.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Grades {
    int grade;
    String lessonName;
    Date dateOfLesson;
}
