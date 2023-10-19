package com.example.hakatonovertask.models.news;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import com.example.hakatonovertask.models.Image;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Table(name="News")
@NoArgsConstructor
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsID")
    private int id;
    @Column(name = "publish_date")
    private Date publish_date;
    @Column(name = "Title")
    private String title;
    @Column(name = "Content")
    private String content;
    @Column(name = "Image")
    private String image;
    @JsonIgnore
   @OneToOne(mappedBy = "news",cascade = CascadeType.ALL)
    private Image img;
}
