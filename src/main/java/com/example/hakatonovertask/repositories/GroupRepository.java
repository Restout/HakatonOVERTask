package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.groups.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group,Integer> {
    Group getGroupByCourseCourseId(Integer courseId);
}
