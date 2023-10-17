package com.example.hakatonovertask.models.course;

import com.example.hakatonovertask.models.SelectionCommittee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CourseID")
    private int courseId;
    @Column(name = "CourseName")
    private String name;
    @ManyToOne
    @JoinColumn(name = "ID")
    private SelectionCommittee selectionCommittee;

    public Course(String name, SelectionCommittee selectionCommittee) {
        this.name = name;
        this.selectionCommittee = selectionCommittee;
    }
}
