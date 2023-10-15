package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Image;
import com.example.hakatonovertask.models.News;
import com.example.hakatonovertask.models.NewsDAO;
import com.example.hakatonovertask.repositories.ImageRepository;
import com.example.hakatonovertask.repositories.NewsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class NewsService {
    private NewsRepository newsRepository;
    private ImageRepository imageRepository;
    @Autowired
    public void setNewsReposytory(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }
    @Autowired
    public void setImageReposytory(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Page<News> GetNewsPage(Integer limit, Integer page){
        Pageable Page = PageRequest.of(page-1,limit);
        return newsRepository.findAll(Page);
    }

    @Transactional
    public News SaveNews(NewsDAO newsDAO){
        News news = new News();
        news.setContent(newsDAO.getContent());
        news.setTitle(newsDAO.getTitle());
        news.setPublish_date(new Date());
        news = newsRepository.save(news);
        System.out.println(news);
        Image img = new Image(news.getId(),news,newsDAO.getImage()) ;
        System.out.println(img);
        imageRepository.save(img);
        news.setImagePath("img"+Integer.toString(news.getId()));
        return newsRepository.save(news);
    }

    public void deleteNews(Integer id){
        newsRepository.deleteById(id);
    }

}
