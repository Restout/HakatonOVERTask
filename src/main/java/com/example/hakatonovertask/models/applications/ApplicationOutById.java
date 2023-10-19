package com.example.hakatonovertask.models.applications;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicationOutById {
    private int applicationID;
    private String courseName;
    private String firstName;
    private String lastName;
    private String fatherName;
    private String status;
    private String description;
}
