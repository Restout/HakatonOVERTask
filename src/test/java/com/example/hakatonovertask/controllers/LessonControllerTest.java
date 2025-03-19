package com.example.hakatonovertask.controllers;


import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.repositories.LessonRepository;
import com.example.hakatonovertask.service.LessonService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@ExtendWith(MockitoExtension.class)
class LessonControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private LessonController lessonController;

    @Mock
    private LessonRepository lessonRepository;
    @Mock
    private LessonService lessonService;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(lessonController)
                .build();
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("Should return lesson when requesting lesson by ID")
    public void testGetLessonById() throws Exception {
        Integer lessonId = 1;
        Lesson mockLesson = new Lesson();
        mockLesson.setLessonId(lessonId);
        mockLesson.setLessonName("Java Basics");

        when(lessonRepository.findById(lessonId)).thenReturn(Optional.of(mockLesson));

        mockMvc.perform(get("/api/auth/lesson")
                        .param("lessonId", lessonId.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lessonId", is(lessonId)))
                .andExpect(jsonPath("$.lessonName", is("Java Basics")));

        verify(lessonRepository, times(1)).findById(lessonId);
    }

    @Test
    @DisplayName("Should return null when lesson ID does not exist")
    @SneakyThrows
    public void testGetLessonByIdNotFound() {
        Integer lessonId = 999;
        when(lessonRepository.findById(lessonId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/auth/lesson")
                        .param("lessonId", lessonId.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(""));

        verify(lessonRepository, times(1)).findById(lessonId);
    }

    @Test
    @DisplayName("Should return set of lessons for a user")
    @SneakyThrows
    public void testGetLessons() {
        Integer userId = 1;
        Set<Lesson> lessons = new HashSet<>();

        Lesson lesson1 = new Lesson();
        lesson1.setLessonId(1);
        lesson1.setLessonName("Java Basics");

        Lesson lesson2 = new Lesson();
        lesson2.setLessonId(2);
        lesson2.setLessonName("Spring Framework");

        lessons.add(lesson1);
        lessons.add(lesson2);

        when(lessonService.getLessons(userId)).thenReturn(lessons);

        mockMvc.perform(get("/api/auth/lesson/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[*].lessonId", containsInAnyOrder(1, 2)))
                .andExpect(jsonPath("$[*].lessonName", containsInAnyOrder("Java Basics", "Spring Framework")));

        verify(lessonService, times(1)).getLessons(userId);
    }

    @Test
    @DisplayName("Should save a new lesson")
    @SneakyThrows
    public void testSaveLesson() {
        Lesson lesson = new Lesson();
        lesson.setLessonName("New Lesson");

        Lesson savedLesson = new Lesson();
        savedLesson.setLessonId(1);
        savedLesson.setLessonName("New Lesson");

        when(lessonService.saveLesson(ArgumentMatchers.any(Lesson.class))).thenReturn(savedLesson);

        mockMvc.perform(post("/api/auth/lesson")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(lesson)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lessonId", is(1)))
                .andExpect(jsonPath("$.lessonName", is("New Lesson")));

        verify(lessonService, times(1)).saveLesson(ArgumentMatchers.any(Lesson.class));
    }

    @Test
    @DisplayName("Should update an existing lesson")
    @SneakyThrows
    public void testUpdateLesson() {
        Integer lessonId = 1;
        Lesson lesson = new Lesson();
        lesson.setLessonName("Updated Lesson");

        Lesson updatedLesson = new Lesson();
        updatedLesson.setLessonId(lessonId);
        updatedLesson.setLessonName("Updated Lesson");

        when(lessonService.updateLesson(ArgumentMatchers.any(Lesson.class), eq(lessonId))).thenReturn(updatedLesson);

        mockMvc.perform(put("/api/auth/lesson/{lessonId}", lessonId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(lesson)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lessonId", is(lessonId)))
                .andExpect(jsonPath("$.lessonName", is("Updated Lesson")));

        verify(lessonService, times(1)).updateLesson(ArgumentMatchers.any(Lesson.class), eq(lessonId));
    }

    @Test
    @DisplayName("Should delete a lesson")
    @SneakyThrows
    public void testDeleteLesson() {
        Integer lessonId = 1;

        mockMvc.perform(delete("/api/auth/lesson/{lessonId}", lessonId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(lessonService, times(1)).deleteLesson(lessonId);
    }
}