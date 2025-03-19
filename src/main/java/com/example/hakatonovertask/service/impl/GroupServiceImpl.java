package com.example.hakatonovertask.service.impl;

import com.example.hakatonovertask.mappers.GroupMapper;
import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.models.groups.GroupStudentOut;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.service.GroupService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final UserJpaRepository userRepository;
    private final GroupMapper groupMapper;

    @Override
    public List<GroupOut> getAll(Integer userId) {
        return userRepository.findById(userId)
                .map(UserModel::getGroups)
                .orElse(new HashSet<>())
                .stream()
                .map(this::groupToDTO)
                .toList();
    }

    @Override
    public GroupStudentOut getGroup(Integer groupId) {
        var group = groupRepository.findById(groupId)
                .orElseThrow(EntityNotFoundException::new);

        return groupMapper.fromGroupToGroupStudentDto(group);
    }

    @Override
    @Transactional
    public GroupOut saveGroup(GroupAllInfo group) {
        UserModel groupOwner = userRepository.findById(group.getCreatorId())
                .orElseThrow(EntityNotFoundException::new);

        var groupToSave = creatGroup(group, groupOwner);
        groupOwner.getGroups().add(groupToSave);

        return groupToDTO(groupRepository.save(groupToSave));
    }

    @Override
    public GroupOut changeExistingGroup(GroupAllInfo group, Integer groupId) {
        return userRepository.findById(group.getCreatorId())
                .map(creator -> groupToDTO(groupRepository.save(new Group(groupId, group.getGroupName(), creator))))
                .orElse(new GroupOut());
    }

    @Override
    public void deleteGroup(Integer GroupId) {
        groupRepository.deleteById(GroupId);
    }

    private GroupOut groupToDTO(Group group) {
        return new GroupOut(group.getGroupId(), group.getGroupName());
    }

    private Group creatGroup(GroupAllInfo group, UserModel user) {
        var groupToSave = new Group(group.getGroupName(), user);
        List<UserModel> userModels = new ArrayList<>();
        userModels.add(user);
        groupToSave.setStudents(userModels);
        return groupToSave;
    }
}
