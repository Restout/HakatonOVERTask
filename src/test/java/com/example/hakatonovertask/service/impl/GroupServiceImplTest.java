package com.example.hakatonovertask.service.impl;

import com.example.hakatonovertask.mappers.GroupMapper;
import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.models.groups.GroupStudentOut;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GroupServiceImplTest {

    private GroupRepository groupRepository;
    private UserJpaRepository userRepository;
    private GroupMapper groupMapper;
    private GroupServiceImpl groupService;

    @BeforeEach
    void setUp() {
        groupRepository = mock(GroupRepository.class);
        userRepository = mock(UserJpaRepository.class);
        groupMapper = mock(GroupMapper.class);
        groupService = new GroupServiceImpl(groupRepository, userRepository, groupMapper);
    }

    @Test
    void getAll_shouldReturnUserGroups() {
        Integer userId = 1;

        Group group1 = new Group(10, "Group A", null);
        Group group2 = new Group(11, "Group B", null);

        UserModel user = new UserModel();
        user.setGroups(Set.of(group1, group2));

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        List<GroupOut> result = groupService.getAll(userId);

        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(g -> g.getGroupName().equals("Group A")));
        assertTrue(result.stream().anyMatch(g -> g.getGroupName().equals("Group B")));
    }

    @Test
    void getGroup_shouldReturnMappedGroup() {
        int groupId = 5;
        Group group = new Group(groupId, "Group X", null);
        GroupStudentOut dto = new GroupStudentOut();

        when(groupRepository.findById(groupId)).thenReturn(Optional.of(group));
        when(groupMapper.fromGroupToGroupStudentDto(group)).thenReturn(dto);

        GroupStudentOut result = groupService.getGroup(groupId);

        assertEquals(dto, result);
    }

    @Test
    void getGroup_shouldThrowExceptionIfNotFound() {
        when(groupRepository.findById(anyInt())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> groupService.getGroup(123));
    }

    @Test
    void saveGroup_shouldSaveAndReturnGroupOut() {
        GroupAllInfo groupInfo = new GroupAllInfo(0, "New Group", 0, 0, 1);
        UserModel creator = new UserModel();
        creator.setGroups(new HashSet<>());

        Group groupToSave = new Group("New Group", creator);
        groupToSave.setStudents(List.of(creator));
        Group savedGroup = new Group(10, "New Group", creator);

        when(userRepository.findById(groupInfo.getCreatorId())).thenReturn(Optional.of(creator));
        when(groupRepository.save(any(Group.class))).thenReturn(savedGroup);

        GroupOut result = groupService.saveGroup(groupInfo);

        assertEquals("New Group", result.getGroupName());
    }

    @Test
    void changeExistingGroup_shouldUpdateGroup() {
        GroupAllInfo groupInfo = new GroupAllInfo(0, "Updated Group", 0, 0, 1);
        UserModel creator = new UserModel();
        Group savedGroup = new Group(15, "Updated Group", creator);

        when(userRepository.findById(1)).thenReturn(Optional.of(creator));
        when(groupRepository.save(any(Group.class))).thenReturn(savedGroup);

        GroupOut result = groupService.changeExistingGroup(groupInfo, 15);

        assertEquals("Updated Group", result.getGroupName());
        assertEquals(15, result.getGroupId());
    }

    @Test
    void changeExistingGroup_shouldReturnEmptyIfCreatorNotFound() {
        when(userRepository.findById(anyInt())).thenReturn(Optional.empty());

        GroupOut result = groupService.changeExistingGroup(new GroupAllInfo(), 1);

        assertNotNull(result);
        assertEquals(0, result.getGroupId());
        assertNull(result.getGroupName());
    }

    @Test
    void deleteGroup_shouldCallRepository() {
        groupService.deleteGroup(100);
        verify(groupRepository, times(1)).deleteById(100);
    }
}