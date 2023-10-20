package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Task;
import com.example.hakatonovertask.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TaskController {
    TaskService taskService;
    @Autowired
    public void setTaskService(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("api/auth/task/{taskId}")
    public ResponseEntity<Task> getTask(@PathVariable("taskId") Integer taskId){
        return ResponseEntity.ok().body(taskService.getTask(taskId));
    }
    @PostMapping("api/auth/task")
    public ResponseEntity<Task> saveTask(@RequestParam("materialId")Integer materialId,@RequestBody Task task){
        return ResponseEntity.ok().body(taskService.saveTask(task,materialId));
    }
    @PutMapping("/api/auth/task/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable("taskId") Integer taskId,@RequestBody Task task){
        return ResponseEntity.ok().body(taskService.updateTask(task,taskId));
    }
    @DeleteMapping("/api/auth/task/{taskId}")
    public  void deleteTask(@PathVariable("taskId") Integer taskId){
        taskService.deleteTask(taskId);
    }

}
