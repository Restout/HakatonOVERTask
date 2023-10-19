package com.example.hakatonovertask.repositories.users;

import com.example.hakatonovertask.models.teacher.Teacher;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherJpaRepository extends CrudRepository<Teacher, Integer> {
}
