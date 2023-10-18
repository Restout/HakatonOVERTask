package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.course.Course;
import com.example.hakatonovertask.models.course.CourseIn;
import com.example.hakatonovertask.models.course.CourseOut;
import com.example.hakatonovertask.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourseController {
    CourseService courseService;
    @Autowired
    public void setCourseService(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/api/courses")
    public ResponseEntity<List<CourseOut>> getCourses(){
        return ResponseEntity.ok().body(courseService.getCourse());
    }

    @PostMapping("/api/auth/courses")
    public ResponseEntity<CourseOut> saveCourse(@RequestBody CourseIn course){
        try {
            return ResponseEntity.ok().body(courseService.saveCourse(course));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
    @PutMapping("/api/auth/courses/{courseId}")
    public ResponseEntity<CourseOut> updateCourse(@RequestBody CourseIn course, @PathVariable("courseId") Integer courseId){
        try {
            return ResponseEntity.ok().body(courseService.updateCourse(course, courseId));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/api/auth/courses/{courseId}")
    public void deleteCourse(@PathVariable("courseId") Integer courseId){
       // courseService.deleteCourse(courseId);
    }
}
