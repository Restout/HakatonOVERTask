package com.example.hakatonovertask.models.groups;

import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="Groups")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Group {
    @Id
    @Column(name="GroupID")
    private int groupId;
    @OneToMany(mappedBy = "group")
    private List<ScheldueDay> scheldueDay;
    @Column(name="CourseID")
    private int courseId;
    @Column(name = "GroupName")
    private String groupName;
    @Column(name="ID")
    private int supervisiorId;

    public Group(int groupId, int courseId, String groupName, int supervisiorId) {
        this.groupId = groupId;;
        this.courseId = courseId;
        this.groupName = groupName;
        this.supervisiorId = supervisiorId;
    }

    public Group(int groupId) {
        this.groupId = groupId;
    }
}
