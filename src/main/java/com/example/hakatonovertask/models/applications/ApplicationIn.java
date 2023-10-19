package com.example.hakatonovertask.models.applications;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicationIn {
    private int ID;
    private int courseID;
    private String chiefName;
    private String currentPosition;
    private String departmentName;
    private int experience;
    private String merits;
    private String motivationLetter;
}
