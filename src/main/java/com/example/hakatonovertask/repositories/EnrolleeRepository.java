package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Enrollee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrolleeRepository extends JpaRepository<Enrollee, Integer> {
}
