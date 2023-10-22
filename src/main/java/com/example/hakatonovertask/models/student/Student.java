package com.example.hakatonovertask.models.student;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.security.model.UserModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @Id
    @Column(name = "ID")
    private int id;
    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "ID")
    private UserModel user;
    @Column(name = "RecordBookID")
    private int recordBookId;
    @Column(name = "GroupID")
    private int GroupID;
    @ManyToOne
    @JoinColumn(name = "GroupID", insertable = false, updatable = false)
    @JsonIgnore
    private Group group;
}
//GRAND logic rework to delete and creat again i
