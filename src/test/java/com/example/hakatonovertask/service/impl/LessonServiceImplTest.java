package com.example.hakatonovertask.service.impl;

import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.repositories.LessonRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LessonServiceImplTest {

    private LessonRepository lessonRepository;
    private LessonServiceImpl lessonService;

    @BeforeEach
    void setUp() {
        lessonRepository = mock(LessonRepository.class);
        lessonService = new LessonServiceImpl(lessonRepository);
    }

    @Test
    void getLessons_shouldReturnEmptySet() {
        Set<Lesson> result = lessonService.getLessons(1);
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void saveLesson_shouldCallRepositorySave() {
        Lesson lesson = new Lesson("Math", "Algebra basics");
        Lesson savedLesson = new Lesson(1, "Math", "Algebra basics");

        when(lessonRepository.save(lesson)).thenReturn(savedLesson);

        Lesson result = lessonService.saveLesson(lesson);

        assertEquals(savedLesson, result);
        verify(lessonRepository, times(1)).save(lesson);
    }

    @Test
    void updateLesson_shouldSetIdAndSave() {
        Lesson lesson = new Lesson("Physics", "Intro to mechanics");
        Lesson updatedLesson = new Lesson(2, "Physics", "Intro to mechanics");

        when(lessonRepository.save(any(Lesson.class))).thenReturn(updatedLesson);

        Lesson result = lessonService.updateLesson(lesson, 2);

        assertEquals(2, result.getLessonId());
        verify(lessonRepository, times(1)).save(lesson);
    }

    @Test
    void deleteLesson_shouldCallDeleteById() {
        lessonService.deleteLesson(5);
        verify(lessonRepository, times(1)).deleteById(5);
    }
}
