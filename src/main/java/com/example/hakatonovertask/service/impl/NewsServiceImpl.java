package com.example.hakatonovertask.service.impl;

import com.example.hakatonovertask.models.Image;
import com.example.hakatonovertask.models.news.News;
import com.example.hakatonovertask.models.news.NewsDAO;
import com.example.hakatonovertask.models.news.NewsOut;
import com.example.hakatonovertask.repositories.ImageRepository;
import com.example.hakatonovertask.repositories.NewsRepository;
import com.example.hakatonovertask.service.NewsService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final NewsRepository newsRepository;
    private final ImageRepository imageRepository;

    @Override
    public List<NewsOut> GetNewsPage(Integer limit, Integer page) {
        Pageable Page = PageRequest.of(page - 1, limit);
        List<News> news = newsRepository.findAll(Page).getContent();
        List<NewsOut> newsOut = new ArrayList<NewsOut>();
        for (var oneNews : news) {
            NewsOut oneNewsOut = new NewsOut(
                    oneNews.getId(),
                    oneNews.getPublish_date(),
                    oneNews.getTitle(),
                    oneNews.getContent(),
                    oneNews.getImage()
            );
            newsOut.add(oneNewsOut);
        }
        return newsOut;
    }

    @Transactional
    @Override
    public News SaveNews(NewsDAO newsDAO) throws IOException {
        News news = new News();
        news.setContent(newsDAO.getContent());
        news.setTitle(newsDAO.getTitle());
        news.setPublish_date(new Date());
        news = newsRepository.save(news);
        String fileName = "/" + "img" + Integer.toString(news.getId()) + newsDAO.getFileName().substring(newsDAO.getFileName().lastIndexOf('.'));
        news.setImage(fileName);
        File file = new File("src/main/resources/static/media/" + fileName);
        if (file.createNewFile()) {
            OutputStream os = new FileOutputStream(file);
            os.write(newsDAO.getImage().getBytes());
            os.close();
        } else {
            throw new IOException("File already exist");
        }
        Image img = new Image(news.getId(), news, newsDAO.getImage().getBytes());
        imageRepository.save(img);
        return newsRepository.save(news);
    }

    @Override
    public void deleteNews(Integer id) {
        newsRepository.deleteById(id);
    }
}
