package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Image;
import com.example.hakatonovertask.models.news.News;
import com.example.hakatonovertask.models.news.NewsDAO;
import com.example.hakatonovertask.models.news.NewsOut;
import com.example.hakatonovertask.repositories.ImageRepository;
import com.example.hakatonovertask.repositories.NewsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    public List<NewsOut> GetNewsPage(Integer limit, Integer page){
        Pageable Page = PageRequest.of(page-1,limit);
        List<News> news = newsRepository.findAll(Page).getContent();
        List<NewsOut> newsOut = new ArrayList<NewsOut>();
        for (var oneNews:news ) {
            NewsOut oneNewsOut = new NewsOut(
                    oneNews.getId(),
                    oneNews.getPublish_date(),
                    oneNews.getTitle(),
                    oneNews.getContent(),
                    oneNews.getImagePath()
            );
            newsOut.add(oneNewsOut);
        }
        return newsOut;
    }

    @Transactional
    public News SaveNews(NewsDAO newsDAO) throws IOException {
        News news = new News();
        news.setContent(newsDAO.getContent());
        news.setTitle(newsDAO.getTitle());
        news.setPublish_date(new Date());
        news = newsRepository.save(news);
        String fileName ="/"+"img"+Integer.toString(news.getId())+newsDAO.getFileName().substring(newsDAO.getFileName().lastIndexOf('.'));
        news.setImagePath(fileName);
        File file = new File("src/main/resources/static/media/"+fileName);
        if(file.createNewFile()){
            OutputStream os = new FileOutputStream(file);
            os.write(newsDAO.getImage());
            os.close();
        }else {
            throw new IOException("File already exist");
        }
        Image img = new Image(news.getId(),news,newsDAO.getImage()) ;
        imageRepository.save(img);
        return newsRepository.save(news);
    }

    public void deleteNews(Integer id){
        System.out.println(id);
        newsRepository.deleteById(id);
    }

}
