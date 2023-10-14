package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.Data;
import com.example.hakatonovertask.models.Image;

import java.util.Date;

@Entity
@Data
@Table(name="News")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date publish_date;
    private String Title;
    private String Content;
    @GeneratedValue(strategy = GenerationType.TABLE)
    private String imagePath;
   @OneToOne(mappedBy = "news")
    private Image image;
}
