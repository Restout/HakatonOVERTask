package com.example.hakatonovertask.models.news;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewsDAO {
    private String title;
    private String content;
    private String fileName;
    private  MultipartFile image;
}
