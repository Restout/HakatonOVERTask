package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Enrollee;
import com.example.hakatonovertask.models.applications.Application;
import com.example.hakatonovertask.models.applications.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface ApplicationRepository extends JpaRepository<Application, Integer>, CrudRepository<Application, Integer> {
    Page<Application> findAllByStatusAndChiefID(Status status, int id, Pageable pageable);
    Page<Application> findAllByStatus(Status status,Pageable pageable);
    List<Application> findAllByEnrollee(Enrollee userId);
}
