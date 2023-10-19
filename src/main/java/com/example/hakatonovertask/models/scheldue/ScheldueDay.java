package com.example.hakatonovertask.models.scheldue;

import com.example.hakatonovertask.models.LessonTeacher;
import com.example.hakatonovertask.models.groups.Group;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Date;

@Setter

@Getter

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="ScheduleDay")
@Entity
public class ScheldueDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ScheldueID")
    private int scheldueId;
    @Column(name = "Day")
    private Date day;
    @Column(name = "Time")
    private Date startTime;
    @Column(name = "TimeEnd")
    private Date endTime;
    @ManyToOne
    @JoinColumn(name="GroupID")
    private Group group;
    @Column(name = "Audience")
    private String audience;

    @ManyToOne
    @JoinColumns(
            {
                    @JoinColumn(name ="LessonID", referencedColumnName = "LessonID"),
                    @JoinColumn(name ="ID", referencedColumnName = "ID")
            }
    )
    @Fetch(FetchMode.JOIN)
    private LessonTeacher lessonTeacher;

    public ScheldueDay(Date day, Date startTime, Date endTime, Group group, String audience, LessonTeacher lessonTeacher) {
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.group = group;
        this.audience = audience;
        this.lessonTeacher = lessonTeacher;
    }
}
