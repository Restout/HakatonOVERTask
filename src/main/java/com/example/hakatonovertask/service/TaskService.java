package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Material;
import com.example.hakatonovertask.models.Task;
import com.example.hakatonovertask.repositories.TaskRepositpry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    TaskRepositpry taskRepositpry;
    @Autowired
    public void setTaskRepositpry(TaskRepositpry taskRepositpry) {
        this.taskRepositpry = taskRepositpry;
    }
    public Task saveTask(Task task, Integer materialId){
        task.setMaterial(new Material());
        task.getMaterial().setMaterialId(materialId);
         return taskRepositpry.save(task);
    }
    public Task updateTask(Task task,Integer taskId){
        if(taskRepositpry.existsById(taskId)){
            Task dbTask = taskRepositpry.findById(taskId).orElse(null);
            task.setMaterial(dbTask.getMaterial());
            task.setAnswers(dbTask.getAnswers());
            task.setTaskId(taskId);
            return taskRepositpry.save(task);
        }else {
            return null;
        }
    }
    public Task getTask(Integer taskId){
        return taskRepositpry.findById(taskId).orElse(null);
    }
    public void deleteTask(Integer taskId){
        taskRepositpry.deleteById(taskId);
    }
}
