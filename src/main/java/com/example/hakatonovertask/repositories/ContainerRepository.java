package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Container;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContainerRepository extends JpaRepository<Container,Integer> {
    Container getContainerByLessonIdAndStudentId(Integer lessonId,Integer studentId);
}
