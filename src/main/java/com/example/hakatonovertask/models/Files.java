package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "files")
public class Files {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FilesID")
    private Integer fileId;
    @Column(name = "FileName")
    private String fileName;
    @Column(name = "File")
    private byte[] file;

}
