package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.GroupAllDTO;
import com.example.hakatonovertask.models.groups.GroupDTO;
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
    public List<GroupDTO> getAll(){
        List<GroupDTO> groupsDTO = new ArrayList<GroupDTO>();
        List<Group> groups = groupRepository.findAll();
        for (var group: groups) {
            groupsDTO.add(groupToDTO(group));
        }
        return groupsDTO;
    }

    public GroupDTO saveGroup(GroupAllDTO group, Integer groupId){
        GroupDTO groupDTO = new GroupDTO();
        if(groupId==null){
            groupDTO = groupToDTO(groupRepository.save(new Group(group.getGroupId(),group.getCourseId(),group.getGroupName(),group.getSupervisiorId())));
        }else {
            groupDTO = groupToDTO(groupRepository.save(new Group(groupId,group.getCourseId(),group.getGroupName(),group.getSupervisiorId())));
        }
        return groupDTO;
    }

    public void deleteGroup(Integer GroupId){
        groupRepository.delete(new Group(GroupId));
    }
    private GroupDTO groupToDTO(Group group){
        return new GroupDTO(group.getGroupId(),group.getGroupName());
    }
}
