package com.example.hakatonovertask.service.impl;

import com.example.hakatonovertask.mappers.ScheduleMapper;
import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import com.example.hakatonovertask.models.scheldue.ScheduleInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.repositories.ScheldueRepository;
import com.example.hakatonovertask.service.ScheduleService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheldueServiceImpl implements ScheduleService {
    private final ScheldueRepository scheldueRepository;
    private final ScheduleMapper scheduleMapper;
    private final EntityManager entityManager;

    @Override
    public List<ScheldueDayOut> getScheldueByGroupAndDate(Integer groupId, LocalDate startOfWeek) {
        LocalDate endOfWeek = startOfWeek.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        List<ScheduleDay> days = scheldueRepository.getScheldueDaysByGroupGroupIdAndDayBetween(groupId, startOfWeek, endOfWeek);
        return scheduleMapper.fromScheduleListToScheduleOutDto(days);
    }

    @Override
    @Transactional
    public ScheldueDayOut saveScheldue(Integer groupId, ScheduleInfoToSave toSave) {
        var lesson = new Lesson(toSave.getLessonName(), toSave.getLessonDescription());
        var group = entityManager.getReference(Group.class, groupId);

        var schedule = new ScheduleDay(lesson, toSave.getDay(), toSave.getStartTime(), toSave.getEndTime(),
                group, toSave.getLocation(), toSave.getOrganizerLastName(), toSave.getOrganizerFirstName());
        return scheduleMapper.fromScheduleToScheduleOutDto(scheldueRepository.saveAndFlush(schedule));
    }

    @Transactional
    @Override
    public ScheldueDayOut updateScheldueDay(Integer scheldueId, ScheduleInfoToSave toSave) {
 /*       ScheduleDay scheduleDay = scheldueRepository.getReferenceById(scheldueId);

        scheduleDay = new ScheduleDay(
                scheduleDay.getScheldueId(),
                toSave.getLessonName(),
                toSave.getDay(),
                toSave.getStartTime(),

                toSave.getEndTime(),
                scheduleDay.getGroup(),
                toSave.getLocation(),
                toSave.getOrganizerLastName(),
                toSave.getOrganizerFirstName()
        );

        scheduleDay = scheldueRepository.save(scheduleDay);

        return scheldueDayToOut(scheduleDay.getScheldueId());*/
        return null;
    }

    @Override
    public ScheldueDayOut findScheduleById(Integer id) {
        ScheduleDay day = scheldueRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        return scheduleMapper.fromScheduleToScheduleOutDto(day);
    }

    @Override
    public void deleteScheldue(Integer scheldueId) {
        scheldueRepository.deleteById(scheldueId);
    }
}
