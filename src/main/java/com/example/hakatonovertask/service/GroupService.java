package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupService {
    private GroupRepository groupRepository;
    @Autowired
    public void setGroupRepository(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }
    public List<GroupOut> getAll(){
        List<GroupOut> groupsDTO = new ArrayList<GroupOut>();
        List<Group> groups = groupRepository.findAll();
        for (var group: groups) {
            groupsDTO.add(groupToDTO(group));
        }
        return groupsDTO;
    }

    public GroupOut saveGroup(GroupAllInfo group, Integer groupId){
        GroupOut groupOut = new GroupOut();
        if(groupId==null){
            groupOut = groupToDTO(groupRepository.save(new Group(group.getGroupId(),group.getCourseId(),group.getGroupName(),group.getSupervisiorId())));
        }else {
            groupOut = groupToDTO(groupRepository.save(new Group(groupId,group.getCourseId(),group.getGroupName(),group.getSupervisiorId())));
        }
        return groupOut;
    }

    public void deleteGroup(Integer GroupId){
        groupRepository.deleteById(GroupId);
    }
    private GroupOut groupToDTO(Group group){
        return new GroupOut(group.getGroupId(),group.getGroupName());
    }
}
