package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Container;
import com.example.hakatonovertask.models.LessonTeacher;
import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.scheldue.ScheldueInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.models.teacher.Teacher;
import com.example.hakatonovertask.repositories.*;
import com.example.hakatonovertask.repositories.users.TeacherJpaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
@Transactional
@Service
public class ScheldueService {
    private GroupRepository groupRepository;
    private ContainerRepository containerRepository;
    private TeacherJpaRepository teacherJpaRepository;
    private ScheldueRepository scheldueRepository;
    private LessonRepository lessonRepository;
    private LessonTeacherRepository lessonTeacherRepository;
    @Autowired
    public void setGroupRepository(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Autowired
    public void setContainerRepository(ContainerRepository containerRepository) {
        this.containerRepository = containerRepository;
    }

    @Autowired
    public void setTeacherJpaRepository(TeacherJpaRepository teacherJpaRepository) {
        this.teacherJpaRepository = teacherJpaRepository;
    }

    @Autowired
    public void setScheldueRepository(ScheldueRepository scheldueRepository) {
        this.scheldueRepository = scheldueRepository;
    }
    @Autowired
    public void setLessonRepository(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }
    @Autowired
    public void setLessonTeacherRepository(LessonTeacherRepository lessonTeacherRepository) {
        this.lessonTeacherRepository = lessonTeacherRepository;
    }

    public List<ScheldueDayOut> getScheldueByGroupAndDate(Integer groupId, Date date){
        Calendar calendar = Calendar.getInstance();
        if(date != null){
            calendar.setTime(date);

        }else {
            int dayOfWeek = 2;
            int weekday = calendar.get(Calendar.DAY_OF_WEEK);
            int days = (Calendar.SATURDAY - weekday + dayOfWeek-7) % 7;
            calendar.add(Calendar.DAY_OF_YEAR, days);
            date=calendar.getTime();
        }
        calendar.add(Calendar.DAY_OF_MONTH, 5);
        List<ScheduleDay> days = scheldueRepository.getScheldueDaysByGroupGroupIdAndDayBetween(groupId,date,calendar.getTime());
        List<ScheldueDayOut> dayDTO =new ArrayList<ScheldueDayOut>();
        for (var day: days) {
            dayDTO.add( new ScheldueDayOut(
                    day.getScheldueId(),
                    day.getDay(),
                    day.getLessonTeacher().getLesson().getLessonName(),
                    day.getStartTime(),
                    day.getEndTime(),
                    day.getAudience(),
                    day.getLessonTeacher().getTeacher().getUser().getFirstName(),
                    day.getLessonTeacher().getTeacher().getUser().getLastName()
            ));

        }

        return dayDTO;
    }

    public ScheldueDayOut saveScheldue(Integer groupId, ScheldueInfoToSave toSave){
        LessonTeacher lessonTeacher;
        if(lessonTeacherRepository.getLessonTeacherByLessonLessonIdAndTeacherTeacherId(lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonId(),toSave.getTeacherId())==null){
            lessonTeacher = new LessonTeacher(lessonRepository.getLessonByLessonName(toSave.getLesson()),teacherJpaRepository.findById(toSave.getTeacherId()).orElse(null));
        }else {
            lessonTeacher=lessonTeacherRepository.getLessonTeacherByLessonLessonIdAndTeacherTeacherId(lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonId(),toSave.getTeacherId());
        }
        for (var student:groupRepository.findById(groupId).orElse(null).getStudents()) {
            if(containerRepository.getContainerByLessonIdAndStudentId(lessonTeacher.getLesson().getLessonId(),student.getId())==null) {
                containerRepository.save(new Container(lessonTeacher, student.getId()));
            }
        }
        ScheduleDay scheduleDay = new ScheduleDay(
                toSave.getDay(),
                toSave.getStartTime(),
                toSave.getEndTime(),
                new Group(groupId),
                toSave.getAudience(),
                lessonTeacher
                );
        scheduleDay = scheldueRepository.save(scheduleDay);

        return scheldueDayToOut(scheduleDay.getScheldueId()) ;
    }
    @Transactional
   public ScheldueDayOut updateScheldueDay(Integer scheldueId, ScheldueInfoToSave toSave){
       LessonTeacher lessonTeacher;
       if(lessonTeacherRepository.getLessonTeacherByLessonLessonIdAndTeacherTeacherId(lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonId(),toSave.getTeacherId())==null){
           lessonTeacher = new LessonTeacher(lessonRepository.getLessonByLessonName(toSave.getLesson()),teacherJpaRepository.findById(toSave.getTeacherId()).orElse(null));
           lessonTeacherRepository.save(lessonTeacher);
       }else {
           lessonTeacher=lessonTeacherRepository.getLessonTeacherByLessonLessonIdAndTeacherTeacherId(lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonId(),toSave.getTeacherId());
       }
       ScheduleDay scheduleDay = scheldueRepository.getReferenceById(scheldueId);

       scheduleDay = new ScheduleDay(
               scheduleDay.getScheldueId(),
               toSave.getDay(),
               toSave.getStartTime(),
               toSave.getEndTime(),
               scheduleDay.getGroup(),
               toSave.getAudience(),
               lessonTeacher
               );
       scheduleDay = scheldueRepository.save(scheduleDay);

       return scheldueDayToOut(scheduleDay.getScheldueId()) ;
   }
    public ScheldueDayOut scheldueDayToOut(int id){
        ScheduleDay day = scheldueRepository.getReferenceById(id);
        ScheldueDayOut out =new ScheldueDayOut(
                day.getScheldueId(),
                day.getDay(),
                day.getLessonTeacher().getLesson().getLessonName(),
                day.getStartTime(),
                day.getEndTime(),
                day.getAudience(),
                day.getLessonTeacher().getTeacher().getUser().getFirstName(),
                day.getLessonTeacher().getTeacher().getUser().getLastName()
        );
        return out;
    }
    public void deleteScheldue(Integer scheldueId){
        scheldueRepository.deleteById(scheldueId);
    }
}
