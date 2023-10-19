package com.example.hakatonovertask.models;

import com.example.hakatonovertask.models.SelectionCommittee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CourseID")
    private int courseId;
    @Column(name = "CourseName")
    private String courseName;
    @Column(name = "About")
    private String about;
    @Column(name = "Programm")
    private String programm;
    @Column(name = "Requirements")
    private String requirements;
    @Column(name = "Result")
    private String result;
    @Transient
    private boolean isParticipant;
    public Course(int courseId) {
        this.courseId = courseId;
    }
}
