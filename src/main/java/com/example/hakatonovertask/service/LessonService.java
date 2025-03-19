package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Lesson;

import java.util.Set;

public interface LessonService {
    Set<Lesson> getLessons(Integer userId);

    Lesson saveLesson(Lesson lesson);

    Lesson updateLesson(Lesson lesson, Integer lessonId);

    void deleteLesson(Integer lessonId);
}
