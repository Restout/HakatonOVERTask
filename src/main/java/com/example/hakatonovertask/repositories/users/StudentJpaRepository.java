package com.example.hakatonovertask.repositories.users;

import com.example.hakatonovertask.models.student.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StudentJpaRepository extends CrudRepository<Student,Integer> {
    List<Student> findAllByGroupGroupId(int groupId);
}
