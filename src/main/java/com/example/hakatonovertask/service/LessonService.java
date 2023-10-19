package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import com.example.hakatonovertask.repositories.LessonRepository;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import jakarta.persistence.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LessonService {
    private LessonRepository lessonRepository;
    private StudentJpaRepository studentJpaRepository;
    @Autowired
    public void setLessonRepository(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }
    @Autowired
    public void setStudentJpaRepository(StudentJpaRepository studentJpaRepository) {
        this.studentJpaRepository = studentJpaRepository;
    }

    public List<Lesson> getLessons(Integer userId){
        List<ScheldueDay> scheldueDays = studentJpaRepository.findById(userId).orElse(null).getGroup().getScheldueDay();
        List<Lesson> lessons = new ArrayList<Lesson>();
        for (var scheldue:scheldueDays) {
            lessons.add(scheldue.getLessonTeacher().getLesson());
        }
        return lessons;
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
