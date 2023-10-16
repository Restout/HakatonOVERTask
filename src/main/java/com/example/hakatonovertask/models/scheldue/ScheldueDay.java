package com.example.hakatonovertask.models.scheldue;

import com.example.hakatonovertask.models.LessonTeacher;
import com.example.hakatonovertask.models.Teacher;
import com.example.hakatonovertask.models.groups.Group;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Setter

@Getter

@AllArgsConstructor

@NoArgsConstructor

@ToString
@Table(name="ScheduleDay")
@IdClass(ScheldueDayId.class)
@Entity
public class ScheldueDay {
    @Id
    @Column(name = "Day")
    private Date day;
    @Id
    @Column(name = "Time")
    private Date startTime;
    @Id
    @Column(name = "TimeEnd")
    private Date endTime;
    @Id
    @ManyToOne
    @JoinColumn(name="GroupID")
    private Group group;

    private String audience;

    @ManyToOne
    @JoinColumns(
            {
                    @JoinColumn(name ="LessonID", referencedColumnName = "LessonID"),
                    @JoinColumn(name ="ID", referencedColumnName = "ID")
            }
    )
    private LessonTeacher lessonTeacher;
}
