package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface LessonRepository extends JpaRepository<Lesson,Integer> {
    Lesson getLessonByLessonName(String lessonName);
    Set<Lesson> getLessonsByLessonTeachersTeacherTeacherId(Integer teacherId);
}
