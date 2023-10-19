package com.example.hakatonovertask.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private int lessonId;
    @Column(name="LessonName")
    private String lessonName;
    @Column(name = "Description")
    private String description;
    @JsonIgnore
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    private List<LessonTeacher> lessonTeachers;

}
