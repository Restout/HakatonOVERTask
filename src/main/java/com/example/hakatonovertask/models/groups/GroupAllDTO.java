package com.example.hakatonovertask.models.groups;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GroupAllDTO extends GroupDTO{
    public GroupAllDTO() {
        super();
    }
    private int supervisiorId;
    private int courseId;
}
