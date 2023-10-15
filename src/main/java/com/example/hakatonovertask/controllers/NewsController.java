package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.NewsDAO;
import com.example.hakatonovertask.service.NewsService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.hakatonovertask.models.News;
import java.util.List;

@RestController
public class NewsController {
    @Autowired
    private NewsService service;

    @GetMapping("/hackathon/news")
    public ResponseEntity<List<News>> getNews(@RequestParam(name = "limit")Integer limit, @RequestParam(name = "page") Integer page){
        Page<News> news = service.GetNewsPage(limit, page);
        return ResponseEntity.ok()
                .body(news.getContent());
    }
    @PostMapping("/hackathon/news")
    public ResponseEntity<News> saveNews(@RequestBody NewsDAO news, HttpServletResponse response){
        System.out.println(news);
        return ResponseEntity.ok()
                .body(service.SaveNews(news));
    }
    @DeleteMapping("/news/{id}")
    public void deleteNews(@PathVariable("id") Integer id ){
        service.deleteNews(id);
    }
}
