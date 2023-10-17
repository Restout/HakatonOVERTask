package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.SelectionCommittee;
import com.example.hakatonovertask.models.Teacher;
import com.example.hakatonovertask.models.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course,Integer> {
}
