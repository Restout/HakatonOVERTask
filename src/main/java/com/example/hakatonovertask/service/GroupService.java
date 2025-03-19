package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.models.groups.GroupStudentOut;

import java.util.List;

public interface GroupService {
    List<GroupOut> getAll(Integer userId);

    GroupStudentOut getGroup(Integer groupId);

    GroupOut saveGroup(GroupAllInfo group);

    GroupOut changeExistingGroup(GroupAllInfo group, Integer groupId);

    void deleteGroup(Integer groupId);
}
