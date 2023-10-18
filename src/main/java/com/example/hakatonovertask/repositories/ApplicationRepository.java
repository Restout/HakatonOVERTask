package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.applications.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;


public interface ApplicationRepository extends JpaRepository<Application, Integer>, CrudRepository<Application, Integer> {
}
