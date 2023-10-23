package com.example.hakatonovertask.models.Attendance;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AttendanceOutList {
    private String studentLastName;
    private boolean has_been;
}
