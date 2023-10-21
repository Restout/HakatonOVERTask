package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Course;
import com.example.hakatonovertask.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")

    public ResponseEntity<Course> saveCourse(@RequestBody Course course){
            return ResponseEntity.ok().body(courseService.saveCourse(course));
    }
    @PutMapping("/api/auth/courses/{courseId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseEntity<Course> updateCourse(@RequestBody Course course, @PathVariable("courseId") Integer courseId){
        return ResponseEntity.ok().body(courseService.updateCourse(course, courseId));
    }
    @DeleteMapping("/api/auth/courses/{courseId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")

    public void deleteCourse(@PathVariable("courseId") Integer courseId){
        courseService.deleteCourse(courseId);
    }
}
