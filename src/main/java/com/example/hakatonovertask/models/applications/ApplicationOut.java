package com.example.hakatonovertask.models.applications;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class ApplicationOut {
    private int userId;
    private int applicationID;
    private String courseName;
    private String firstName;
    private String lastName;
    private String fatherName;
    private String email;
    private String phone;
    private String status;
    private Date dateOfChange;
}
