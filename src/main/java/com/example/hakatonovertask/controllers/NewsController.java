package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.news.NewsDAO;
import com.example.hakatonovertask.models.news.NewsOut;
import com.example.hakatonovertask.service.NewsService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.hakatonovertask.models.news.News;
import java.util.List;

@RestController
public class NewsController {
    @Autowired
    private NewsService service;

    @GetMapping("/api/news")
    public ResponseEntity<List<NewsOut>> getNews(@RequestParam(name = "limit")Integer limit, @RequestParam(name = "page") Integer page){
        List<NewsOut> news = service.GetNewsPage(limit, page);
        System.out.println(news);
        return ResponseEntity.ok()
                .body(news);
    }
    @PostMapping("/api/auth/news")
    public ResponseEntity<News> saveNews(@RequestBody NewsDAO news, HttpServletResponse response){
        try {
            return ResponseEntity.ok()
                    .body(service.SaveNews(news));
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/api/auth/news/{id}")
    public void deleteNews(@PathVariable("id") Integer id ){
        service.deleteNews(id);
    }
}
