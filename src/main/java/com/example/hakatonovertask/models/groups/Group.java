package com.example.hakatonovertask.models.groups;

import com.example.hakatonovertask.models.course.Course;
import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="Groups")
@Setter

@Getter

@AllArgsConstructor

@NoArgsConstructor

@ToString
public class Group {
    @Id
    @Column(name="GroupID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;
  /*  @OneToMany(mappedBy = "group")
    private List<ScheldueDay> scheldueDay;*/
    @ManyToOne
    @JoinColumn(name = "CourseID")
    private Course course;
    @Column(name = "GroupName")
    private String groupName;
    @Column(name="ID")
    private int supervisiorId;

    public Group( Course course, String groupName, int supervisiorId) {

        this.course = course;
        this.groupName = groupName;
        this.supervisiorId = supervisiorId;
    }
    public Group(Integer groupId, Course course, String groupName, int supervisiorId) {
        this.groupId = groupId;
        this.course = course;
        this.groupName = groupName;
        this.supervisiorId = supervisiorId;
    }
    public Group(int groupId) {
        this.groupId = groupId;
    }
}
