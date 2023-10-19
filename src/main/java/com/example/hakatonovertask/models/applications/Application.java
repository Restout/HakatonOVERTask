package com.example.hakatonovertask.models.applications;


import com.example.hakatonovertask.models.Enrollee;
import com.example.hakatonovertask.models.Course;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

import static com.example.hakatonovertask.models.applications.Status.*;

@Entity
@Table(name="Applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ApplicationsID")
    private int applicationId;
    @ManyToOne
    @JoinColumn(name = "ID")
    private Enrollee enrollee;
    @ManyToOne
    @JoinColumn(name = "CourseID")
    private Course course;
    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private Status status;
    @Column(name = "ChiefID")
    private int chiefID;
    @Column(name = "CurrentPosition")
    private String currentPosition;
    @Column(name = "DepartmentName")
    private String departmentName;
    @Column(name = "Experience")
    private int experience;
    @Column(name = "Merits")
    private String merits;
    @Column(name = "MotivationLetter")
    private String motivationLetter;
    @Column(name="DateOfChange")
    private Date dateOfChange;

    public Application(Enrollee enrollee,
                       Course course,
                       int chiefID,
                       String currentPosition,
                       String departmentName,
                       int experience,
                       String motivationLetter,
                       String merits){
        this.course = course;
        this.enrollee = enrollee;
        this.chiefID = chiefID;
        this.currentPosition = currentPosition;
        this.departmentName = departmentName;
        this.experience = experience;
        this.motivationLetter = motivationLetter;
        this.merits = merits;
        this.status = FOR_APPROVAL;
        this.dateOfChange = new Date();
    }
}
