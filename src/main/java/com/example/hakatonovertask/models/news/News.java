package com.example.hakatonovertask.models.news;

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
    @Column(name = "NewsID")
    private int id;
    @Column(name = "publish_date")
    private Date publish_date;
    @Column(name = "Title")
    private String Title;
    @Column(name = "Content")
    private String Content;
    @Column(name = "Image")
    private String imagePath;
   @OneToOne(mappedBy = "news")
    private Image image;
}
