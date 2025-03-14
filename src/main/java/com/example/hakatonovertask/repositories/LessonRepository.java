package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson,Integer> {
    Lesson getLessonByLessonName(String lessonName);
}
