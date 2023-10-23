package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Container;
import com.example.hakatonovertask.repositories.ContainerRepository;
import com.example.hakatonovertask.repositories.LessonTeacherRepository;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import com.example.hakatonovertask.security.model.UserOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContainerService {
    @Autowired
    ContainerRepository containerRepository;
    @Autowired
    LessonTeacherRepository lessonTeacherRepository;
    @Autowired
    StudentJpaRepository studentJpaRepository;
    public List<UserOut> getContainerStudent(Integer lessonId,Integer teacherId){
        List<UserOut> userOuts = new ArrayList<UserOut>();
        List<Container> containers = containerRepository.getContainersByLessonTeacher(lessonTeacherRepository.getLessonTeacherByLessonLessonIdAndTeacherTeacherId(lessonId,teacherId));
        for (var container:containers) {
            userOuts.add(new UserOut(studentJpaRepository.findById(container.getStudentId()).orElse(null).getUser()));
        }
        return userOuts;
    }
}
