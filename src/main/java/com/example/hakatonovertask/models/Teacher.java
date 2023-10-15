package com.example.hakatonovertask.models;

import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="teacher")
public class Teacher {
    @Id
    @Column(name = "ID")
    private int teacherId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ID")
    @MapsId
    private User user;
    @Column(name="AcademicDegree")
    private String academicDegree;
    @Column(name = "AcademicTitle")
    private String academicTitle;
    @OneToMany(mappedBy = "teacher")
    private List<LessonTeacher> lessons;
}
