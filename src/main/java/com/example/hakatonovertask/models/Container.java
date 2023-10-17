package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Container")
public class Container {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ContainerID")
    private int containerId;
    @ManyToOne
    @JoinColumns(
            {
                    @JoinColumn(name ="LessonID", referencedColumnName = "LessonID"),
                    @JoinColumn(name ="TeacherID", referencedColumnName = "ID")
            }
    )
    private LessonTeacher lessonTeacher;
    @Column(name = "ID")
    private int studentId;
}
