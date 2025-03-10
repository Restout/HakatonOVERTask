package com.example.hakatonovertask.models.groups;

import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "Groups")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Group {
    @Id
    @Column(name = "GroupID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;
    @Column(name = "GroupName")
    private String groupName;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CREATOR_ID", referencedColumnName = "ID")
    private UserModel creator;
    @ManyToMany(mappedBy = "groups", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<UserModel> students;

    public Group(String groupName, UserModel creator) {
        this.groupName = groupName;
        this.creator = creator;
    }

    public Group(Integer groupId, String groupName, UserModel creator) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.creator = creator;
    }

    public Group(int groupId) {
        this.groupId = groupId;
    }
}
