package com.example.hakatonovertask.repositories.users;

import com.example.hakatonovertask.models.student.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentJpaRepository extends CrudRepository<Student,Integer> {
}
