package com.example.hakatonovertask.models.groups;

import com.example.hakatonovertask.security.model.UserOut;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GroupStudentOut {
    private int groupId;
    private String groupName;
    private UserOut creator;
    private List<UserOut> students = new ArrayList<>();
}
