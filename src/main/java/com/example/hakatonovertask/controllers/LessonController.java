package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.repositories.LessonRepository;
import com.example.hakatonovertask.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
public class LessonController {
    private final LessonRepository lessonRepository;
    private final LessonService lessonService;

    @GetMapping("/api/auth/lesson")
    public Lesson getLessonById(@RequestParam("lessonId") Integer lessonId) {
        return lessonRepository.findById(lessonId).orElse(null);
    }

    @GetMapping("/api/auth/lesson/{userId}")
    public Set<Lesson> getLessons(@PathVariable Integer userId) {
        return lessonService.getLessons(userId);
    }

    @PostMapping("/api/auth/lesson")
    public Lesson saveLesson(@RequestBody Lesson lesson) {
        return lessonService.saveLesson(lesson);
    }

    @PutMapping("/api/auth/lesson/{lessonId}")
    public Lesson updateLesson(@RequestBody Lesson lesson, @PathVariable("lessonId") Integer lessonId) {
        return lessonService.updateLesson(lesson, lessonId);
    }

    @DeleteMapping("/api/auth/lesson/{lessonId}")
    public void deleteLesson(@PathVariable("lessonId") Integer lessonId) {
        lessonService.deleteLesson(lessonId);
    }
}
