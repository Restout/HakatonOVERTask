package com.example.hakatonovertask.models.groups;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupAllInfo {
    private int groupId;
    private String groupName;
    private int supervisorId;
    private int courseId;
    private Integer creatorId;
}
