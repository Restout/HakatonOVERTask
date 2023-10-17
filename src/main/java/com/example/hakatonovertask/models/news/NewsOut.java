package com.example.hakatonovertask.models.news;

import com.example.hakatonovertask.models.Image;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
@Data
@AllArgsConstructor
public class NewsOut {
    private int id;

    private Date publish_date;

    private String Title;

    private String Content;

    private String imagePath;

}
