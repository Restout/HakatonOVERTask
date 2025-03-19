package com.example.hakatonovertask.service.impl;

import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.repositories.LessonRepository;
import com.example.hakatonovertask.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    private final LessonRepository lessonRepository;

    @Override
    public Set<Lesson> getLessons(Integer userId) {
        return new HashSet<>();
    }

    @Override
    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    @Override
    public Lesson updateLesson(Lesson lesson, Integer lessonId) {
        lesson.setLessonId(lessonId);
        return lessonRepository.save(lesson);
    }

    @Override
    public void deleteLesson(Integer lessonId) {
        lessonRepository.deleteById(lessonId);
    }
}
