package com.example.hakatonovertask.models.Attendance;

import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import com.example.hakatonovertask.models.student.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;


@Table(name="Attendance")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@IdClass(CompositePK.class)
public class Attendance {

    @Column(name = "has_been")
    private boolean has_been;
    @Id
    @ManyToOne
    @JoinColumn(name = "StudentID")
    private Student student;
    @Id
    @ManyToOne
    @JoinColumn(name = "ScheduleID")
    private ScheduleDay scheduleDay;

}

class CompositePK implements Serializable {
    private Student student;
    private ScheduleDay scheduleDay;
}

