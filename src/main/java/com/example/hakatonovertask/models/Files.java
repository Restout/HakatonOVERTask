package com.example.hakatonovertask.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "files")
@AllArgsConstructor
@NoArgsConstructor
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

    public Files(String fileName, byte[] file) {
        this.fileName = fileName;
        this.file = file;
    }
}
