package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.SelectionCommittee;
import com.example.hakatonovertask.models.course.Course;
import com.example.hakatonovertask.models.course.CourseIn;
import com.example.hakatonovertask.models.course.CourseOut;
import com.example.hakatonovertask.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {

    CourseRepository courseRepository;
    @Autowired
    public void setCourseRepository(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<CourseOut> getCourse(){
        List<CourseOut> courseOuts = new ArrayList<CourseOut>();
        List<Course> courses = courseRepository.findAll();
        for (var course:courses) {
            courseOuts.add(courseToOut(course));
        }
        return courseOuts;
    }
    public CourseOut saveCourse(CourseIn courseIn){
        Course course = new Course(
                courseIn.getName(),
                new SelectionCommittee(courseIn.getSelectionCommitteeId())
        );
        course= courseRepository.save(course);
        return courseToOut(course);
    }
    public CourseOut updateCourse(CourseIn courseIn, Integer courseId){
        Course course = new Course(
                courseId,
                courseIn.getName(),
                new SelectionCommittee(courseIn.getSelectionCommitteeId())
        );
        course= courseRepository.save(course);
        return courseToOut(course);
    }
    private CourseOut courseToOut(Course course){
        return new CourseOut(course.getCourseId(),course.getName());
    }
}
