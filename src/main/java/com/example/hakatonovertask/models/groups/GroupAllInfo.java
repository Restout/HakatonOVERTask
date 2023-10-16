package com.example.hakatonovertask.models.groups;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GroupAllInfo extends GroupOut {
    public GroupAllInfo() {
        super();
    }
    private int supervisiorId;
    private int courseId;
}
