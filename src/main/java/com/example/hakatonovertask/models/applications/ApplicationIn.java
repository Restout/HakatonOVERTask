package com.example.hakatonovertask.models.applications;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicationIn {
    private int courseID;
    private int ID;
    private String description;
}
