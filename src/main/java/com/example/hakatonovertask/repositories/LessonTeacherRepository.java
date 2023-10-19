package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.LessonTeacher;
import com.example.hakatonovertask.models.LessonTeacherId;
import org.springframework.data.repository.CrudRepository;

public interface LessonTeacherRepository extends CrudRepository<LessonTeacher, LessonTeacherId> {
    LessonTeacher getLessonTeacherByLessonLessonIDAndTeacherTeacherId(Integer lessonId, Integer teacherId);
}
