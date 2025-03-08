package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.models.LessonTeacher;
import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import com.example.hakatonovertask.repositories.LessonRepository;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import com.example.hakatonovertask.repositories.users.TeacherJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class LessonService {
    private LessonRepository lessonRepository;

    @Autowired
    public void setLessonRepository(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }


    public Set<Lesson> getLessonByTeacherId(Integer teacherId) {
        return lessonRepository.getLessonsByLessonTeachersTeacherTeacherId(teacherId);
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
