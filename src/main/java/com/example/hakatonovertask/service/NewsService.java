package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.news.News;
import com.example.hakatonovertask.models.news.NewsDAO;
import com.example.hakatonovertask.models.news.NewsOut;

import java.io.IOException;
import java.util.List;

public interface NewsService {
    List<NewsOut> GetNewsPage(Integer limit, Integer page);

    News SaveNews(NewsDAO newsDAO) throws IOException;

    void deleteNews(Integer id);
}
