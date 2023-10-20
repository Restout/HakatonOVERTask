package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepositpry extends JpaRepository<Task,Integer> {
}
