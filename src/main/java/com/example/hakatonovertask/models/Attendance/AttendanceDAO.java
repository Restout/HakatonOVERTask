package com.example.hakatonovertask.models.Attendance;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AttendanceDAO {
    private int studentId;
    private boolean has_been;
}
