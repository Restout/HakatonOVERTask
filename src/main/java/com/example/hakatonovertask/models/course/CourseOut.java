package com.example.hakatonovertask.models.course;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseOut {
    private int courseId;
    private String name;
}
