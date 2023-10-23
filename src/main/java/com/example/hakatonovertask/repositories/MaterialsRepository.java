package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Container;
import com.example.hakatonovertask.models.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialsRepository extends JpaRepository<Material,Integer> {
    @Query("SELECT m FROM Material m WHERE m.container.lessonId = :lessonId AND m.container.studentId = :studentId")
    List<Material> getMaterialsByContainerLessonIdAndContainerStudentId(Integer lessonId, Integer studentId);
    Material getMaterialByContainer(Container container);
}
