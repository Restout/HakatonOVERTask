package com.example.hakatonovertask.models.scheldue;

import com.example.hakatonovertask.models.LessonTeacher;
import com.example.hakatonovertask.models.Teacher;
import com.example.hakatonovertask.models.groups.Group;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name="ScheldueDay")
@IdClass(ScheldueDayId.class)
public class ScheldueDay {
    @Id
    @Column(name = "ID")
    private Date day;
    @Id
    @Column(name = "time")
    private Date startTime;
    @Id
    @Column(name = "timeend")
    private Date endTime;
    @Id
    @ManyToOne
    @JoinColumn(name="groupid")
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
