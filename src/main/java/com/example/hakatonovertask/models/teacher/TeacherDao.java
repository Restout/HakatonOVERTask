package com.example.hakatonovertask.models.teacher;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.AccessType;

@Data
@AllArgsConstructor
public class TeacherDao {
    int id;
    String academicDegree;
    String academicTitle;
}
