package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Course;
import com.example.hakatonovertask.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CourseController {
    CourseService courseService;
    @Autowired
    public void setCourseService(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/api/courses")
    public ResponseEntity<List<Course>> getCourses(@RequestParam("userId") Optional<Integer> userId){

        return ResponseEntity.ok().body(courseService.getCourse(userId.orElse(null)));
    }
    @GetMapping("/api/courses/{courseId}")
    public ResponseEntity<Course> getCourseById( @PathVariable("courseId") Integer courseId){

        return ResponseEntity.ok().body(courseService.getCourseById(courseId));
    }

    @PostMapping("/api/auth/courses")
    public ResponseEntity<Course> saveCourse(@RequestBody Course course){
        try {
            return ResponseEntity.ok().body(courseService.saveCourse(course));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
    @PutMapping("/api/auth/courses/{courseId}")
    public ResponseEntity<Course> updateCourse(@RequestBody Course course, @PathVariable("courseId") Integer courseId){
        try {
            return ResponseEntity.ok().body(courseService.updateCourse(course, courseId));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/api/auth/courses/{courseId}")
    public void deleteCourse(@PathVariable("courseId") Integer courseId){
        courseService.deleteCourse(courseId);
    }
}
