package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import com.example.hakatonovertask.models.scheldue.ScheldueDayDTO;
import com.example.hakatonovertask.repositories.ScheldueRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Transactional
@Service
public class ScheldueService {
    private ScheldueRepository scheldueRepository;
    @Autowired
    public void setScheldueRepository(ScheldueRepository scheldueRepository) {
        this.scheldueRepository = scheldueRepository;
    }

    public List<ScheldueDayDTO> getScheldueByGroup(Integer groupId){
        List<ScheldueDay> days = scheldueRepository.getScheldueDaysByGroupGroupId(groupId);
        List<ScheldueDayDTO> dayDTO =new ArrayList<ScheldueDayDTO>();
        for (var day: days) {
            dayDTO.add( new ScheldueDayDTO(
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
}
