package com.example.hakatonovertask.models.scheldue;

import com.example.hakatonovertask.models.groups.Group;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter

@Getter

@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ScheduleDay")
@Entity
public class ScheduleDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ScheldueID")
    private int scheldueId;
    @Column(name = "LessonName")
    private String lessonName;
    @Column(name = "Day")
    private Date day;
    @Column(name = "Time")
    private Date startTime;
    @Column(name = "TimeEnd")
    private Date endTime;
    @ManyToOne
    @JoinColumn(name = "GroupID")
    private Group group;
    @Column(name = "Audience")
    private String location;
    @Column(name = "OrganizerLastName")
    private String organizerLastName;
    @Column(name = "OrganizerFirstName")
    private String organizerFirstName;

    public ScheduleDay(String lessonName, Date day, Date startTime, Date endTime, Group group, String audience, String organizerLastName, String organizerFirstName) {
        this.lessonName = lessonName;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.group = group;
        this.location = audience;
        this.organizerLastName = organizerLastName;
        this.organizerFirstName = organizerFirstName;
    }
}
