package com.example.hakatonovertask.service.impl;

import com.example.hakatonovertask.mappers.ScheduleMapper;
import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import com.example.hakatonovertask.models.scheldue.ScheduleInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.repositories.ScheldueRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ScheldueServiceImplTest {

    private ScheldueRepository scheldueRepository;
    private ScheduleMapper scheduleMapper;
    private EntityManager entityManager;
    private ScheldueServiceImpl scheldueService;

    @BeforeEach
    void setUp() {
        scheldueRepository = mock(ScheldueRepository.class);
        scheduleMapper = mock(ScheduleMapper.class);
        entityManager = mock(EntityManager.class);
        scheldueService = new ScheldueServiceImpl(scheldueRepository, scheduleMapper, entityManager);
    }

    @Test
    void getScheldueByGroupAndDate_shouldReturnMappedDays() {
        int groupId = 1;
        LocalDate monday = LocalDate.of(2025, 5, 12); // Monday
        LocalDate sunday = monday.with(DayOfWeek.SUNDAY);

        List<ScheduleDay> mockDays = List.of(mock(ScheduleDay.class));
        List<ScheldueDayOut> mockOut = List.of(mock(ScheldueDayOut.class));

        when(scheldueRepository.getScheldueDaysByGroupGroupIdAndDayBetween(groupId, monday, sunday))
                .thenReturn(mockDays);
        when(scheduleMapper.fromScheduleListToScheduleOutDto(mockDays)).thenReturn(mockOut);

        List<ScheldueDayOut> result = scheldueService.getScheldueByGroupAndDate(groupId, monday);

        assertEquals(mockOut, result);
        verify(scheldueRepository).getScheldueDaysByGroupGroupIdAndDayBetween(groupId, monday, sunday);
    }

    @Test
    void saveScheldue_shouldCreateAndSaveEntity() {
        int groupId = 1;
        ScheduleInfoToSave toSave = new ScheduleInfoToSave();
        toSave.setLessonName("Math");
        toSave.setLessonDescription("Algebra");
        toSave.setDay(LocalDate.of(2025, 5, 15));
        toSave.setLocation("Room 101");
        toSave.setOrganizerFirstName("Ivan");
        toSave.setOrganizerLastName("Ivanov");

        Group mockGroup = new Group();
        ScheduleDay savedDay = mock(ScheduleDay.class);
        ScheldueDayOut mappedOut = mock(ScheldueDayOut.class);

        when(entityManager.getReference(Group.class, groupId)).thenReturn(mockGroup);
        when(scheldueRepository.saveAndFlush(any(ScheduleDay.class))).thenReturn(savedDay);
        when(scheduleMapper.fromScheduleToScheduleOutDto(savedDay)).thenReturn(mappedOut);

        ScheldueDayOut result = scheldueService.saveScheldue(groupId, toSave);

        assertEquals(mappedOut, result);
        verify(scheldueRepository).saveAndFlush(any(ScheduleDay.class));
    }

    @Test
    void updateScheldueDay_shouldUpdateAndSaveEntity() {
        int scheldueId = 1;
        ScheduleDay existingDay = mock(ScheduleDay.class);
        ScheduleInfoToSave toSave = new ScheduleInfoToSave();
        ScheldueDayOut mappedOut = mock(ScheldueDayOut.class);

        when(scheldueRepository.findById(scheldueId)).thenReturn(Optional.of(existingDay));
        when(scheldueRepository.save(existingDay)).thenReturn(existingDay);
        when(scheduleMapper.fromScheduleToScheduleOutDto(existingDay)).thenReturn(mappedOut);

        ScheldueDayOut result = scheldueService.updateScheldueDay(scheldueId, toSave);

        assertEquals(mappedOut, result);
        verify(scheduleMapper).updateScheduleByScheduleInfoDto(existingDay, toSave);
        verify(scheldueRepository).save(existingDay);
    }

    @Test
    void findScheduleById_shouldReturnMappedEntity() {
        int id = 10;
        ScheduleDay day = mock(ScheduleDay.class);
        ScheldueDayOut dto = mock(ScheldueDayOut.class);

        when(scheldueRepository.findById(id)).thenReturn(Optional.of(day));
        when(scheduleMapper.fromScheduleToScheduleOutDto(day)).thenReturn(dto);

        ScheldueDayOut result = scheldueService.findScheduleById(id);

        assertEquals(dto, result);
    }

    @Test
    void deleteScheldue_shouldCallDeleteById() {
        int id = 123;
        scheldueService.deleteScheldue(id);
        verify(scheldueRepository).deleteById(id);
    }
}
