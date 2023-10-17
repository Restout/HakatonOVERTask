package com.example.hakatonovertask.models;

import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter

@Getter

@AllArgsConstructor

@NoArgsConstructor

@ToString
@IdClass(LessonTeacherId.class)
@Table(name = "LessonTeacher")
public class LessonTeacher {
    @Id
    @Column(name = "LessonID")
    private int LessonID;
    @Id
    @ManyToOne()
    @JoinColumn(name = "ID")
    private Teacher teacher;
    @OneToMany(mappedBy = "lessonTeacher")
    private List<ScheldueDay> scheldueDay;
    @ManyToOne
    @JoinColumn(name = "LessonID")
    private Lesson lesson;
}
