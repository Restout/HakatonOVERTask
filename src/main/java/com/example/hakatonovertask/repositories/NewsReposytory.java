package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.News;
 import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsReposytory extends JpaRepository<News,Integer> {
    Page<News> findAll(Pageable Page);
}
