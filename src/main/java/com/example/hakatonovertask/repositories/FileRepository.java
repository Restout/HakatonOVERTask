package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.File;

@Repository
public interface FileRepository extends JpaRepository<Files,Integer> {
}
