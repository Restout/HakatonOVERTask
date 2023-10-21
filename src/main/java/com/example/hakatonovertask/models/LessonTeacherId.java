package com.example.hakatonovertask.models;

import com.example.hakatonovertask.models.teacher.Teacher;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonTeacherId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "LessonID")
    private Lesson lesson;
    @ManyToOne()
    @JoinColumn(name = "ID")
    private Teacher teacher;
}
