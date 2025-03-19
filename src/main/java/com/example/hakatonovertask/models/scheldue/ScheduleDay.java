package com.example.hakatonovertask.models.scheldue;

import com.example.hakatonovertask.models.Lesson;
import com.example.hakatonovertask.models.groups.Group;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
    @Column(name = "Day")
    private LocalDate day;
    @Column(name = "Time")
    private LocalDateTime startTime;
    @Column(name = "TimeEnd")
    private LocalDateTime endTime;
    @Column(name = "Audience")
    private String location;
    @Column(name = "OrganizerLastName")
    private String organizerLastName;
    @Column(name = "OrganizerFirstName")
    private String organizerFirstName;
    @ManyToOne
    @JoinColumn(name = "GroupID")
    private Group group;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "LessonID")
    private Lesson lesson;

    public ScheduleDay(Lesson lesson, LocalDate day, LocalDateTime startTime, LocalDateTime endTime, Group group, String audience, String organizerLastName, String organizerFirstName) {
        this.lesson = lesson;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.group = group;
        this.location = audience;
        this.organizerLastName = organizerLastName;
        this.organizerFirstName = organizerFirstName;
    }
}
