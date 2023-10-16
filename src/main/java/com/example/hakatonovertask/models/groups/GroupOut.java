package com.example.hakatonovertask.models.groups;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupOut {
    private int groupId;
    private String groupName;
}
