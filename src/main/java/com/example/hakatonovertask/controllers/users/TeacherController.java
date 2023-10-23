package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.teacher.Teacher;
import com.example.hakatonovertask.models.teacher.TeacherDao;
import com.example.hakatonovertask.repositories.users.TeacherJpaRepository;
import com.example.hakatonovertask.service.users.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Optional;

@RestController
@PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
public class TeacherController implements BaseUserController<Teacher, TeacherDao> {
    @Autowired
    TeacherService teacherService;
    @Autowired
    TeacherJpaRepository teacherJpaRepository;

    @GetMapping("/api/auth/user/data/teacher/{teacherId}")
    public ResponseEntity<Teacher> getStudent(@PathVariable(name = "teacherId") int teacherId) {
        Optional<Teacher> teacher = teacherJpaRepository.findById(teacherId);
        if (teacher.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(teacher.get());
    }

    @Override
    @GetMapping("/api/auth/user/data/teacher")
    public ResponseEntity<Iterable<Teacher>> getAllRoleUsers() {
        return ResponseEntity
                .ok()
                .body(teacherJpaRepository.findAll());
    }

    @Override
    @PostMapping("/api/auth/user/set/teacher")
    public ResponseEntity<Teacher> creatRoleUser(@RequestBody Teacher role) {
        return ResponseEntity
                .ok()
                .body(teacherService.saveTeacher(role).get());
    }

    @Override
    @PutMapping("/api/auth/user/grand/teacher")
    public ResponseEntity<Teacher> grandUserToRole(@RequestBody TeacherDao roleDao) {
        Teacher teacher;
        try {
            teacher = teacherService.creatTeacherFromUserAndSave(roleDao).get();
        } catch (SQLException e) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(teacher);
    }


    @Override
    public void deleteRoleUserById(int id) {

    }
}
