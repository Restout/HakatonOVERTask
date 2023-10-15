package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.scheldue.ScheldueInfoToSave;
import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import com.example.hakatonovertask.models.scheldue.ScheldueDayOut;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.LessonRepository;
import com.example.hakatonovertask.repositories.LessonTeacherRepository;
import com.example.hakatonovertask.repositories.ScheldueRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Transactional
@Service
public class ScheldueService {
    private ScheldueRepository scheldueRepository;
    private GroupRepository groupRepository;
    @Autowired
    private LessonTeacherRepository lessonTeacherRepository;
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    public void setScheldueRepository(ScheldueRepository scheldueRepository) {
        this.scheldueRepository = scheldueRepository;
    }
    @Autowired
    public void setGroupRepository(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public List<ScheldueDayOut> getScheldueByGroup(Integer groupId){
        List<ScheldueDay> days = scheldueRepository.getScheldueDaysByGroupGroupId(groupId);
        List<ScheldueDayOut> dayDTO =new ArrayList<ScheldueDayOut>();
        for (var day: days) {
            dayDTO.add( new ScheldueDayOut(
                    day.getDay(),
                    day.getLessonTeacher().getLesson().getLessonName(),
                    day.getStartTime(),
                    day.getEndTime(),
                    day.getGroup().getGroupName(),
                    day.getAudience(),
                    day.getLessonTeacher().getTeacher().getUser().getFirsName(),
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
                groupRepository.getReferenceById(groupId),
                toSave.getAudience(),
                lessonTeacherRepository.findLessonTeacherByTeacherTeacherIdAndLessonLessonID(
                        lessonRepository.getLessonByLessonName(toSave.getLesson()).getLessonID(),
                        toSave.getTeacherId()
                )
        );
        scheldueDay = scheldueRepository.save(scheldueDay);
        return scheldueDayToOut(scheldueDay) ;
    }
    private ScheldueDayOut scheldueDayToOut(ScheldueDay day){
        ScheldueDayOut out =new ScheldueDayOut(
                day.getDay(),
                day.getLessonTeacher().getLesson().getLessonName(),
                day.getStartTime(),
                day.getEndTime(),
                day.getGroup().getGroupName(),
                day.getAudience(),
                day.getLessonTeacher().getTeacher().getUser().getFirsName(),
                day.getLessonTeacher().getTeacher().getUser().getLastName()
        );
        return out;
    }
}
