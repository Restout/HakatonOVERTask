package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.student.Student;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BaseUserController<T, S> {

    public ResponseEntity<List<T>> getAllRoleUsers();

    public ResponseEntity<T> creatRoleUser();

    public ResponseEntity<T> grandUserToRole(@RequestBody S roleDao);

    public void deleteRoleUserById(@RequestParam int id);
}
