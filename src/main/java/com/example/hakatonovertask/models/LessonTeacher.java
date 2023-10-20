package com.example.hakatonovertask.models;


import com.example.hakatonovertask.models.teacher.Teacher;
import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

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
    private int lessonId;
    @Id
    @ManyToOne()
    @JoinColumn(name = "ID")
    private Teacher teacher;
    @OneToMany(mappedBy = "lessonTeacher")
    private List<ScheduleDay> scheldueDay;
    @ManyToOne
    @JoinColumn(name = "LessonID")
    @Fetch(FetchMode.JOIN)
    private Lesson lesson;

    public LessonTeacher(int lessonID, Teacher teacher) {
        lessonId = lessonID;
        this.teacher = teacher;
    }
}
