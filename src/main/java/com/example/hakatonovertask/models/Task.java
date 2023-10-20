package com.example.hakatonovertask.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "Tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TaskID")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer taskId;
    @ManyToOne
    @JoinColumn(name = "MaterialID")
    @JsonIgnore
    private Material material;
    @Column(name = "Description")
    private String description;
    @Column(name = "Title")
    private String title;
    @Column(name = "Grade")
    private int grade= -1;
    @ManyToMany
    @JoinTable(
            name = "Answer",
            joinColumns = {@JoinColumn(name = "TaskID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> answers;
}
