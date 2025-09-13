package com.example.hakatonovertask.controllers;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Arrays;
import java.util.List;

import com.example.hakatonovertask.models.scheldue.ScheduleInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.service.ScheduleService;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@ExtendWith(MockitoExtension.class)
public class ScheldueControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private ScheldueController scheldueController;

    @Mock
    private ScheduleService scheldueService;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(scheldueController).build();
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    @DisplayName("Test getWeekScheldue with provided date")
    public void testGetWeekScheldueWithDate() throws Exception {
        Integer groupId = 1;
        LocalDate startDate = LocalDate.of(2025, 3, 18);
        LocalDateTime startTime = LocalDateTime.of(2025, 3, 18, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, 3, 18, 12, 0);

        List<ScheldueDayOut> scheduleDays = Arrays.asList(
                new ScheldueDayOut(1, startDate, "Math", "Calculus basics", startTime, endTime, "Room 101", "John", "Doe"),
                new ScheldueDayOut(2, startDate.plusDays(1), "Physics", "Mechanics", startTime.plusDays(1), endTime.plusDays(1), "Room 102", "Jane", "Smith")
        );

        when(scheldueService.getScheldueByGroupAndDate(ArgumentMatchers.eq(groupId), ArgumentMatchers.eq(startDate)))
                .thenReturn(scheduleDays);

        mockMvc.perform(get("/api/schedule/{groupId}", groupId)
                        .param("date", startDate.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].scheduleId", is(1)))
                .andExpect(jsonPath("$[0].lessonName", is("Math")))
                .andExpect(jsonPath("$[0].location", is("Room 101")))
                .andExpect(jsonPath("$[1].scheduleId", is(2)))
                .andExpect(jsonPath("$[1].lessonName", is("Physics")))
                .andExpect(jsonPath("$[1].location", is("Room 102")));

        verify(scheldueService).getScheldueByGroupAndDate(ArgumentMatchers.eq(groupId), ArgumentMatchers.eq(startDate));
    }

    @Test
    @DisplayName("Test getWeekScheldue without provided date")
    public void testGetWeekScheldueWithoutDate() throws Exception {
        Integer groupId = 1;
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDateTime startTime = LocalDateTime.of(startOfWeek.getYear(), startOfWeek.getMonthValue(), startOfWeek.getDayOfMonth(), 10, 0);
        LocalDateTime endTime = LocalDateTime.of(startOfWeek.getYear(), startOfWeek.getMonthValue(), startOfWeek.getDayOfMonth(), 12, 0);

        List<ScheldueDayOut> scheduleDays = Arrays.asList(
                new ScheldueDayOut(1, startOfWeek, "Math", "Calculus basics", startTime, endTime, "Room 101", "John", "Doe"),
                new ScheldueDayOut(2, startOfWeek.plusDays(1), "Physics", "Mechanics", startTime.plusDays(1), endTime.plusDays(1), "Room 102", "Jane", "Smith")
        );

        when(scheldueService.getScheldueByGroupAndDate(ArgumentMatchers.eq(groupId), ArgumentMatchers.any(LocalDate.class)))
                .thenReturn(scheduleDays);

        mockMvc.perform(get("/api/schedule/{groupId}", groupId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].scheduleId", is(1)))
                .andExpect(jsonPath("$[1].scheduleId", is(2)));

        verify(scheldueService).getScheldueByGroupAndDate(ArgumentMatchers.eq(groupId), ArgumentMatchers.any(LocalDate.class));
    }

    @Test
    @DisplayName("Test getScheduleById")
    public void testGetScheduleById() throws Exception {
        Integer scheduleId = 1;
        LocalDate date = LocalDate.of(2025, 3, 18);
        LocalDateTime startTime = LocalDateTime.of(2025, 3, 18, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, 3, 18, 12, 0);

        ScheldueDayOut scheduleDay = new ScheldueDayOut(
                scheduleId, date, "Math", "Calculus basics",
                startTime, endTime, "Room 101", "John", "Doe"
        );

        when(scheldueService.findScheduleById(ArgumentMatchers.eq(scheduleId))).thenReturn(scheduleDay);

        mockMvc.perform(get("/api/schedule")
                        .param("scheduleId", scheduleId.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.scheduleId", is(scheduleId)))
                .andExpect(jsonPath("$.lessonName", is("Math")))
                .andExpect(jsonPath("$.lessonDescription", is("Calculus basics")))
                .andExpect(jsonPath("$.location", is("Room 101")))
                .andExpect(jsonPath("$.firstName", is("John")))
                .andExpect(jsonPath("$.lastName", is("Doe")));

        verify(scheldueService).findScheduleById(ArgumentMatchers.eq(scheduleId));
    }

    @Test
    @DisplayName("Test saveScheldue")
    public void testSaveScheldue() throws Exception {
        Integer groupId = 1;
        LocalDate date = LocalDate.of(2025, 3, 18);
        LocalDateTime startTime = LocalDateTime.of(2025, 3, 18, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, 3, 18, 12, 0);

        ScheduleInfoToSave scheduleInfo = new ScheduleInfoToSave();
        scheduleInfo.setDay(date);
        scheduleInfo.setStartTime(startTime);
        scheduleInfo.setEndTime(endTime);
        scheduleInfo.setLessonName("Java Programming");
        scheduleInfo.setLessonDescription("Introduction to Java");
        scheduleInfo.setLocation("Room 201");
        scheduleInfo.setOrganizerFirstName("Robert");
        scheduleInfo.setOrganizerLastName("Johnson");

        ScheldueDayOut savedSchedule = new ScheldueDayOut(
                1, date, "Java Programming", "Introduction to Java",
                startTime, endTime, "Room 201", "Robert", "Johnson"
        );

        when(scheldueService.saveScheldue(
                ArgumentMatchers.eq(groupId),
                ArgumentMatchers.any(ScheduleInfoToSave.class)
        )).thenReturn(savedSchedule);

        mockMvc.perform(post("/api/schedule/{groupId}", groupId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(scheduleInfo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.scheduleId", is(1)))
                .andExpect(jsonPath("$.lessonName", is("Java Programming")))
                .andExpect(jsonPath("$.lessonDescription", is("Introduction to Java")))
                .andExpect(jsonPath("$.location", is("Room 201")))
                .andExpect(jsonPath("$.firstName", is("Robert")))
                .andExpect(jsonPath("$.lastName", is("Johnson")));

        verify(scheldueService).saveScheldue(
                ArgumentMatchers.eq(groupId),
                ArgumentMatchers.any(ScheduleInfoToSave.class)
        );
    }

    @Test
    @DisplayName("Test updateScheldue")
    public void testUpdateScheldue() throws Exception {
        Integer scheduleId = 1;
        LocalDate date = LocalDate.of(2025, 3, 18);
        LocalDateTime startTime = LocalDateTime.of(2025, 3, 18, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2025, 3, 18, 12, 0);

        ScheduleInfoToSave scheduleInfo = new ScheduleInfoToSave();
        scheduleInfo.setDay(date);
        scheduleInfo.setStartTime(startTime);
        scheduleInfo.setEndTime(endTime);
        scheduleInfo.setLessonName("Advanced Java");
        scheduleInfo.setLessonDescription("Spring Framework");
        scheduleInfo.setLocation("Room 301");
        scheduleInfo.setOrganizerFirstName("Alice");
        scheduleInfo.setOrganizerLastName("Brown");

        ScheldueDayOut updatedSchedule = new ScheldueDayOut(
                scheduleId, date, "Advanced Java", "Spring Framework",
                startTime, endTime, "Room 301", "Alice", "Brown"
        );

        when(scheldueService.updateScheldueDay(
                ArgumentMatchers.eq(scheduleId),
                ArgumentMatchers.any(ScheduleInfoToSave.class)
        )).thenReturn(updatedSchedule);

        mockMvc.perform(put("/api/schedule/{scheduleId}", scheduleId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(scheduleInfo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.scheduleId", is(scheduleId)))
                .andExpect(jsonPath("$.lessonName", is("Advanced Java")))
                .andExpect(jsonPath("$.lessonDescription", is("Spring Framework")))
                .andExpect(jsonPath("$.location", is("Room 301")))
                .andExpect(jsonPath("$.firstName", is("Alice")))
                .andExpect(jsonPath("$.lastName", is("Brown")));

        verify(scheldueService).updateScheldueDay(
                ArgumentMatchers.eq(scheduleId),
                ArgumentMatchers.any(ScheduleInfoToSave.class)
        );
    }

    @Test
    @DisplayName("Test deleteScheldue")
    public void testDeleteScheldue() throws Exception {
        Integer scheduleId = 1;

        mockMvc.perform(delete("/api/schedule/{scheduleId}", scheduleId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(scheldueService).deleteScheldue(ArgumentMatchers.eq(scheduleId));
    }
}