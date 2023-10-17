package com.example.hakatonovertask.models;

import com.example.hakatonovertask.models.course.Course;
import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="SelectionCommittee")
public class SelectionCommittee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ID")
    @MapsId
    private UserModel user;
  /*  @OneToMany(mappedBy = "selectionCommittee")
    private List<Course> course;*/
}
