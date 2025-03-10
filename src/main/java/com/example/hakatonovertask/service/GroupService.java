package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @Transactional
    public GroupOut saveGroup(GroupAllInfo group) {
        UserModel groupOwner = userRepository.findById(group.getCreatorId())
                .orElseThrow(EntityNotFoundException::new);

        var groupToSave = creatGroup(group, groupOwner);
        groupOwner.getGroups().add(groupToSave);

        return groupToDTO(groupRepository.save(groupToSave));
    }

    public GroupOut changeExistingGroup(GroupAllInfo group, Integer groupId) {
        return userRepository.findById(group.getCreatorId())
                .map(creator -> groupToDTO(groupRepository.save(new Group(groupId, group.getGroupName(), creator))))
                .orElse(new GroupOut());
    }

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
