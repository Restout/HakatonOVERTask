package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.student.Student;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BaseUserController<T, S> {

     ResponseEntity<Iterable<T>> getAllRoleUsers();

     ResponseEntity<T> creatRoleUser(T role);

     ResponseEntity<T> grandUserToRole(@RequestBody S roleDao);

     void deleteRoleUserById(@RequestParam int id);
}
