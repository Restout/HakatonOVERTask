package com.example.hakatonovertask.models.teacher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.AccessType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDao {
    int id;
    String academicDegree;
    String academicTitle;
}
