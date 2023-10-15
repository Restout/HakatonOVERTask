package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@Table(name="Images")
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsID")
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name="NewsID"
    )
    @MapsId
    private News news;
    @Column(name="Image")
    private byte[] img;

    public Image(int id, byte[] img) {
        this.id = id;
        this.img = img;
    }
}
