package com.example.hakatonovertask.models.applications;


import com.example.hakatonovertask.models.Enrollee;
import com.example.hakatonovertask.models.course.Course;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.example.hakatonovertask.models.applications.Status.*;

@Entity
@Table(name="Applications", schema="public")
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

    public Application(Enrollee enrollee, Course course, String status){
        this.course = course;
        this.enrollee = enrollee;
        switch (status) {
            case "На согласовании":
                this.status = FOR_APPROVAL;
                break;
            case "Отклонена":
                this.status = REJECTED;
                break;
            case "Зарегистрирована":
                this.status = REGISTERED;
                break;
        }
    }
}
