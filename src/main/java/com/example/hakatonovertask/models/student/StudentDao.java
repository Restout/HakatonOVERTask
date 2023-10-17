package com.example.hakatonovertask.models.student;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDao {
    private int id;
    private int groupId;
    private int recordBookId;
}
