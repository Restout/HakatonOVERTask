package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.models.student.StudentDao;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import com.example.hakatonovertask.service.users.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@PreAuthorize("hasAnyAuthority('ADMIN','SELLECTION_COMMITE')")
public class StudentController implements BaseUserController<Student, StudentDao> {
    @Autowired
    private StudentService studentService;
    @Autowired
    private StudentJpaRepository studentJpaRepository;

    @Override
    @GetMapping("/api/auth/user/data/student")
    public ResponseEntity<Iterable<Student>> getAllRoleUsers() {
        return ResponseEntity
                .ok()
                .body(studentJpaRepository.findAll());
    }

    @Override
    @PostMapping("/api/auth/user/set/student")
    public ResponseEntity<Student> creatRoleUser(@RequestBody Student role) {
        return ResponseEntity
                .ok()
                .body(studentService.saveStudent(role).get());
    }

    @Override

    @PutMapping("/api/auth/user/grand/student")
    public ResponseEntity<Student> grandUserToRole(@RequestBody StudentDao roleDao) {
        Student student;
        try {
            student = studentService.creatStudentFromUserAndSave(roleDao).get();
        } catch (SQLException e) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(student);
    }

    @Override

    @DeleteMapping("/api/auth/user/delete/student")
    public void deleteRoleUserById(@RequestParam int id) {
        studentService.deleteStudentByID(id);
        ResponseEntity
                .ok();
    }
}
