package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    private final UserJpaRepository userRepository;

    public List<GroupOut> getAll() {
        List<GroupOut> groupsDTO = new ArrayList<GroupOut>();
        List<Group> groups = groupRepository.findAll();
        for (var group : groups) {
            groupsDTO.add(groupToDTO(group));
        }
        return groupsDTO;
    }

    public List<GroupOut> getAll(Integer userId) {
        return userRepository.findById(userId)
                .map(UserModel::getGroups)
                .orElse(new HashSet<>())
                .stream()
                .map(this::groupToDTO)
                .toList();
    }

    public GroupOut saveGroup(GroupAllInfo group, Integer groupId) {
        GroupOut groupOut;

        if (groupId == null) {
            groupOut = groupToDTO(groupRepository.save(new Group()));
        } else {
            groupOut = userRepository.findById(group.getSupervisiorId())
                    .map(creator -> groupToDTO(groupRepository.save(new Group(groupId, group.getGroupName(), creator))))
                    .orElse(new GroupOut());
        }
        return groupOut;
    }

    public void deleteGroup(Integer GroupId) {
        groupRepository.deleteById(GroupId);
    }

    private GroupOut groupToDTO(Group group) {

        return new GroupOut(group.getGroupId(), group.getGroupName());
    }
}
