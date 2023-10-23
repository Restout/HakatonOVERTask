package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Container")
@NoArgsConstructor
public class Container {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ContainerID")
    private int containerId;
    @Column(name = "LessonID",insertable = false,updatable = false)
    private int lessonId;
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

    public Container(LessonTeacher lessonTeacher, int studentId) {
        this.lessonTeacher = lessonTeacher;
        this.studentId = studentId;
    }
}
