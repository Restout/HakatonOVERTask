package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.repositories.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class LessonService {
    private LessonRepository lessonRepository;

    @Autowired
    public void setLessonRepository(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }


    public Set<Lesson> getLessons(Integer userId) {
        return new HashSet<>();
    }

    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public Lesson updateLesson(Lesson lesson, Integer lessonId) {
        lesson.setLessonId(lessonId);
        return lessonRepository.save(lesson);
    }

    public void deleteLesson(Integer lessonId) {
        lessonRepository.deleteById(lessonId);
    }
}
