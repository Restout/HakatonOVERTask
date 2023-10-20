package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.groups.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group,Integer> {
    List<Group> getGroupsByCourseCourseId(Integer courseId);
}
