package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Course;
import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.repositories.CourseRepository;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    GroupRepository groupRepository;
    CourseRepository courseRepository;
    StudentJpaRepository studentJpaRepository;
    @Autowired
    public void setGroupRepository(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Autowired
    public void setCourseRepository(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
    @Autowired
    public void setStudentJpaRepository(StudentJpaRepository studentJpaRepository) {
        this.studentJpaRepository = studentJpaRepository;
    }
    public List<Course> getCourseBySupervisior(Integer supervisiorId){
        List<Group> groups = groupRepository.getGroupsBySupervisiorId(supervisiorId);
        List<Course> courses = new ArrayList<Course>();
        for (var group:groups) {
            courses.add(group.getCourse());
        }
        return courses;
    }
    public List<Course> getCourse(Integer userId){
        List<Course> courses =courseRepository.findAll();
        if(userId !=null){
            Student student = studentJpaRepository.findById(userId).orElse(null);
            Integer courseId = student.getGroup().getCourse().getCourseId();
            for (var course:courses) {
                if (course.getCourseId()==courseId) {
                    course.setParticipant(true);
                }
            }
        }
        return courses;
    }
    public Course getCourseById(Integer courseId){
        return courseRepository.findById(courseId).orElse(null);
    }
    public Course saveCourse(Course course){
        return courseRepository.save(course);
    }
    public Course updateCourse(Course course, Integer courseId){
        course.setCourseId(courseId);
        return courseRepository.save(course);
    }
    public void deleteCourse(Integer courseId){
        courseRepository.deleteById(courseId);
    }
}
