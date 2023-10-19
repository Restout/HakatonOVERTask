package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.applications.Application;
import com.example.hakatonovertask.models.applications.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface ApplicationRepository extends JpaRepository<Application, Integer>, CrudRepository<Application, Integer> {
    List<Application> findAllByStatusAndChiefID(Status status, int id);
    List<Application> findAllByStatus(Status status);
}
