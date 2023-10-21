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
@Table(name = "LessonTeacher")
@IdClass(LessonTeacherId.class)
public class LessonTeacher {
    @Id
    @ManyToOne()
    @JoinColumn(name = "ID")
    private Teacher teacher;
    @OneToMany(mappedBy = "lessonTeacher")
    private List<ScheduleDay> scheldueDay;
    @Id
    @ManyToOne
    @JoinColumn(name = "LessonID")
    @Fetch(FetchMode.JOIN)
    private Lesson lesson;

    public LessonTeacher(Lesson lesson, Teacher teacher) {

        this.lesson= lesson;
        this.teacher = teacher;
    }
}
