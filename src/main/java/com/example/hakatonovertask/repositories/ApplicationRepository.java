package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.applications.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
}
