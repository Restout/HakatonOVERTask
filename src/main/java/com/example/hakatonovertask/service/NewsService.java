package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Image;
import com.example.hakatonovertask.models.News;
import com.example.hakatonovertask.models.NewsDAO;
import com.example.hakatonovertask.repositories.ImageReposytory;
import com.example.hakatonovertask.repositories.NewsReposytory;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class NewsService {
    private NewsReposytory newsReposytory;
    private ImageReposytory imageReposytory;
    @Autowired
    public void setNewsReposytory(NewsReposytory newsReposytory) {
        this.newsReposytory = newsReposytory;
    }
    @Autowired
    public void setImageReposytory(ImageReposytory imageReposytory) {
        this.imageReposytory = imageReposytory;
    }

    public Page<News> GetNewsPage(Integer limit, Integer page){
        Pageable Page = PageRequest.of(page-1,limit);
        return newsReposytory.findAll(Page);
    }

    @Transactional
    public void SaveNews(NewsDAO newsDAO){
        News news = new News();
        news.setContent(newsDAO.getContent());
        news.setTitle(newsDAO.getTitle());
        news.setPublish_date(new Date());
        news = newsReposytory.save(news);
        Image img = new Image(news,newsDAO.getImage()) ;
        imageReposytory.save(img);
        news.setImagePath("img"+Integer.toString(news.getId()));
        newsReposytory.save(news);
        return ;
    }
}
