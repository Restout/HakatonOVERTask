package com.example.hakatonovertask.models;

import com.example.hakatonovertask.models.teacher.Teacher;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonTeacherId implements Serializable {
    @Column(name = "LessonID")
    private int lessonId;
    @ManyToOne()
    @JoinColumn(name = "ID")
    private Teacher teacher;
}
