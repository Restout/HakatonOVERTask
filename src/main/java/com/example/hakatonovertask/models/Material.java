package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "Materials")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaterialID")
    private int materialId;
    @ManyToOne
    @JoinColumn(name = "ContainerID")
    private Container container;
    @Column(name = "Date")
    private Date date;
    @Column(name = "ThisTask")
    private boolean isTask;
    @Column(name = "Description")
    private String description;
    @Column(name = "Grade")
    private int grade;
    @ManyToMany
    @JoinTable(
            name = "MaterialFiles",
            joinColumns = {@JoinColumn(name = "MaterialID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> files;
    @ManyToMany
    @JoinTable(
            name = "Answer",
            joinColumns = {@JoinColumn(name = "MaterialID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> answer;
}
