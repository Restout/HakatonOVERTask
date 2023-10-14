package com.example.hakatonovertask.models;

import lombok.Data;

@Data
public class NewsDAO {
    private String title;
    private String content;
    private byte[] image;
}
