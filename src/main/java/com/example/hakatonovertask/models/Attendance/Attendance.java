package com.example.hakatonovertask.models.Attendance;

import com.example.hakatonovertask.models.scheldue.ScheduleDay;
import com.example.hakatonovertask.models.student.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Table(name="Attendance")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {
    @Id
    @Column
    private UUID uuid;
    @Column(name = "has_been")
    private boolean has_been;
    @ManyToOne
    @JoinColumn(name = "StudentID")
    private Student student;
    @ManyToOne
    @JoinColumn(name = "ScheduleID", columnDefinition = "int4")
    private ScheduleDay scheduleDay;

    public Attendance(boolean hasBeen, Student student, ScheduleDay scheduleDay) {
        this.has_been = hasBeen;
        this.student = student;
        this.scheduleDay = scheduleDay;
    }
}
