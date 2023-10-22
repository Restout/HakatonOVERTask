package com.example.hakatonovertask.models.applications;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ApplicationOutById {
    private int userId;
    private int applicationID;
    private String courseName;
    private String firstName;
    private String lastName;
    private String fatherName;
    private String chiefName;
    private String currentPosition;
    private String departmentName;
    private int experience;
    private String merits;
    private String motivationLetter;
    private String status;
    private Date dateOfChange;
}
