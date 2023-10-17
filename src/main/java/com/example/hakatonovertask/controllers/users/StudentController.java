package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.controllers.users.BaseUserController;
import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.models.student.StudentDao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController implements BaseUserController<Student, StudentDao> {

    @Override
    @GetMapping("")
    public ResponseEntity<List<Student>> getAllRoleUsers() {
        return null;
    }

    @Override
    @PostMapping
    public ResponseEntity<Student> creatRoleUser() {
        return null;
    }

    @Override
    @PutMapping
    public ResponseEntity<Student> grandUserToRole(StudentDao roleDao) {
        return null;
    }

    @Override
    @DeleteMapping
    public void deleteRoleUserById(int id) {

    }
}
