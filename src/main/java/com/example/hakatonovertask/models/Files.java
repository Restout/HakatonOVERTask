package com.example.hakatonovertask.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "files")
public class Files {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FilesID")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer fileId;
    @Column(name = "FileName")
    private String fileName;
    @Column(name = "File")
    private byte[] file;

}
