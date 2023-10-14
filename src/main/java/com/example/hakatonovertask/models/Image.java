package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Table(name="img")

public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name="newsid"
    )
    private News news;
    private byte[] img;

    public Image(News news, byte[] img) {
        this.news = news;
        this.img = img;
    }
}
