package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Container;
import com.example.hakatonovertask.models.LessonTeacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContainerRepository extends JpaRepository<Container,Integer> {
    Container getContainerByLessonIdAndStudentId(Integer lessonId,Integer studentId);
    List<Container> getContainersByLessonTeacher(LessonTeacher lessonTeacher);
}
