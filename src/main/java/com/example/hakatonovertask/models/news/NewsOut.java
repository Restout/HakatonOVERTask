package com.example.hakatonovertask.models.news;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsOut {
    private int id;

    private Date publish_date;

    private String Title;

    private String Content;

    private String imagePath;
}
