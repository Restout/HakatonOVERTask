package com.example.hakatonovertask.models;

import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter

@Getter

@AllArgsConstructor

@NoArgsConstructor

@ToString
@Table(name="Teacher")
public class Teacher {
    @Id
    @Column(name = "ID")
    private int teacherId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ID")
    @MapsId
    private UserModel user;
    @Column(name="AcademicDegree")
    private String academicDegree;
    @Column(name = "AcademicTitle")
    private String academicTitle;
    @OneToMany(mappedBy = "teacher")
    private List<LessonTeacher> lessons;
}
