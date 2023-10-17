package com.example.hakatonovertask.models.student;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.security.model.UserModel;
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
    private UserModel userID;
    @Column(name = "RecordBookId")
    private int recordBookId;
    @Column(name = "GroupId")
    private int GroupID;
    @ManyToOne
    @JoinColumn(name = "GroupId")
    private Group group;
}
