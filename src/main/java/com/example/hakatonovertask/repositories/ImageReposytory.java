package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageReposytory extends JpaRepository<Image,Integer> {
}
