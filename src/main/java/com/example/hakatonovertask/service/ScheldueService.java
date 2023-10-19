package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.scheldue.ScheldueInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.repositories.LessonRepository;
import com.example.hakatonovertask.repositories.LessonTeacherRepository;
import com.example.hakatonovertask.repositories.ScheldueRepository;
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
    private ScheldueRepository scheldueRepository;
    private LessonRepository lessonRepository;
    private LessonTeacherRepository lessonTeacherRepository;
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
        List<ScheldueDay> days = scheldueRepository.getScheldueDaysByGroupGroupIdAndDayBetween(groupId,date,calendar.getTime());
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
        ScheldueDay scheldueDay = new ScheldueDay(
                toSave.getDay(),
                toSave.getStartTime(),
                toSave.getEndTime(),
                new Group(groupId),
                toSave.getAudience(),
                lessonTeacherRepository.getLessonTeacherByLessonLessonIDAndTeacherTeacherId(lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonID(),toSave.getTeacherId())
                //new LessonTeacher(lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonID(),new Teacher(toSave.getTeacherId()))
        );
        scheldueDay = scheldueRepository.save(scheldueDay);

        return scheldueDayToOut(scheldueDay.getScheldueId()) ;
    }
   public ScheldueDayOut updateScheldueDay(Integer scheldueId, ScheldueInfoToSave toSave){
       ScheldueDay scheldueDay = scheldueRepository.getReferenceById(scheldueId);
       scheldueDay = new ScheldueDay(
               scheldueDay.getScheldueId(),
               toSave.getDay(),
               toSave.getStartTime(),
               toSave.getEndTime(),
               scheldueDay.getGroup(),
               toSave.getAudience(),
               lessonTeacherRepository.getLessonTeacherByLessonLessonIDAndTeacherTeacherId(lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonID(),toSave.getTeacherId())
               //new LessonTeacher(lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonID(),new Teacher(toSave.getTeacherId()))
       );
       scheldueDay = scheldueRepository.save(scheldueDay);

       return scheldueDayToOut(scheldueDay.getScheldueId()) ;
   }
    public ScheldueDayOut scheldueDayToOut(int id){
        ScheldueDay day = scheldueRepository.getReferenceById(id);
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
