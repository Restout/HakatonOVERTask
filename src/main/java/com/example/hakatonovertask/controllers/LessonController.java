package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LessonController {
    private LessonService lessonService;
    @Autowired
    public void setLessonService(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/api/auth/lesson/{userId}")
    public ResponseEntity<List<Lesson>> getLessons(@PathVariable Integer userId){
        try {
            return ResponseEntity.ok().body(lessonService.getLessons(userId));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/api/auth/lesson")
    public ResponseEntity<Lesson> saveLesson(@RequestBody Lesson lesson){
        try {
            return ResponseEntity.ok().body(lessonService.saveLesson(lesson));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/api/auth/lesson/{lessonId}")
    public ResponseEntity<Lesson> updateLesson(@RequestBody Lesson lesson,@PathVariable("lessonId") Integer lessonId){
        try {
            return ResponseEntity.ok().body(lessonService.updateLesson(lesson,lessonId));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/api/auth/lesson/{lessonId}")
    public void deleteLesson(@PathVariable("lessonId") Integer lessonId){

    }
}
