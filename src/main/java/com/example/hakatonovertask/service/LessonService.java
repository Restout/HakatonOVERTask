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
    private TeacherJpaRepository teacherJpaRepository;
    private LessonRepository lessonRepository;
    private StudentJpaRepository studentJpaRepository;
    @Autowired
    public void setTeacherJpaRepository(TeacherJpaRepository teacherJpaRepository) {
        this.teacherJpaRepository = teacherJpaRepository;
    }

    @Autowired
    public void setLessonRepository(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }
    @Autowired
    public void setStudentJpaRepository(StudentJpaRepository studentJpaRepository) {
        this.studentJpaRepository = studentJpaRepository;
    }
    public Set<Lesson> getLessonByTeacherId(Integer teacherId){
        return lessonRepository.getLessonsByLessonTeachersTeacherTeacherId(teacherId);
    }
    public Set<Lesson> getLessons(Integer userId){
        try {
            List<ScheduleDay> scheduleDays = studentJpaRepository.findById(userId).orElse(null).getGroup().getScheduleDay();

            Set<Lesson> lessons = new HashSet<Lesson>();
            for (var scheldue : scheduleDays) {
                lessons.add(scheldue.getLessonTeacher().getLesson());
            }
            return lessons;
        }catch (NullPointerException e){
            return new HashSet<Lesson>();
        }
    }
    public Lesson saveLesson(Lesson lesson){
        return lessonRepository.save(lesson);
    }
    public Lesson updateLesson(Lesson lesson,Integer lessonId){
        lesson.setLessonId(lessonId);
        return lessonRepository.save(lesson);
    }
    public void deleteLesson(Integer lessonId){
        lessonRepository.deleteById(lessonId);
    }
}
