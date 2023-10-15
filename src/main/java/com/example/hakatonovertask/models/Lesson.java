package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "Lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LessonID")
    private int lessonID;
    @Column(name="LessonName")
    private String lessonName;
    @Column(name = "Description")
    private String description;
    @OneToMany(mappedBy = "lesson")
    private List<LessonTeacher> lessonTeachers;

}
