package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.LessonTeacher;
import com.example.hakatonovertask.models.LessonTeacherId;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonTeacherRepository extends JpaRepository<LessonTeacher, LessonTeacherId> {
    LessonTeacher findLessonTeacherByTeacherTeacherIdAndLessonLessonID(Integer LessonID, Integer TeacherId);
}
