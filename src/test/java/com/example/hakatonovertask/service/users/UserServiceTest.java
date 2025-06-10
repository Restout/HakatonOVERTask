package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.UserGroupRequest;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import com.example.hakatonovertask.service.EmailSenderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.client.HttpClientErrorException;

import java.sql.SQLException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserJpaRepository userRepository;
    private GroupRepository groupRepository;
    private EmailSenderService emailSenderService;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserJpaRepository.class);
        groupRepository = mock(GroupRepository.class);
        emailSenderService = mock(EmailSenderService.class);

        userService = new UserService(userRepository, groupRepository, emailSenderService);
    }

    @Test
    void getAllUsers_shouldReturnPagedUsers() {
        List<UserModel> users = List.of(new UserModel());
        Pageable pageable = PageRequest.of(1, 10);
        when(userRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(users));

        Iterable<UserModel> result = userService.getAllUsers(pageable);

        assertEquals(users, result);
    }

    @Test
    void getCountOfUsers_shouldReturnUserCount() {
        when(userRepository.count()).thenReturn(5L);
        assertEquals(5, userService.getCountOfUsers());
    }

    @Test
    void getCountOfUsersByRole_shouldReturnCount() {
        when(userRepository.countAllByRole(Roles.STUDENT)).thenReturn(3L);
        assertEquals(3, userService.getCountOfUsersByRole(Roles.STUDENT));
    }

    @Test
    void getCountOfUsersByRole_shouldThrowExceptionForInvalidRole() {
        assertThrows(HttpClientErrorException.class, () ->
                userService.getCountOfUsersByRole(null)); // or mock invalid role manually
    }

    @Test
    void addUserToGroup_shouldAddUserAndSendEmail() {
        UserGroupRequest request = new UserGroupRequest("user@mail.com", 1);
        UserModel user = new UserModel();
        user.setEmail("user@mail.com");
        user.setGroups(new HashSet<>());
        Group group = new Group();
        group.setGroupId(1);
        group.setGroupName("Math");
        group.setStudents(new ArrayList<>());

        when(userRepository.findByEmail("user@mail.com")).thenReturn(Optional.of(user));
        when(groupRepository.findById(1)).thenReturn(Optional.of(group));

        userService.addUserToGroup(request);

        assertTrue(user.getGroups().contains(group));
        assertTrue(group.getStudents().contains(user));
        verify(emailSenderService).sendSimplInvationEmail("user@mail.com", "Math");
    }

    @Test
    void addUserToGroup_shouldLogAndSkipIfAlreadyInGroup() {
        UserGroupRequest request = new UserGroupRequest("user@mail.com", 1);
        UserModel user = new UserModel();
        user.setEmail("user@mail.com");
        Group group = new Group();
        group.setGroupName("Math");
        group.setGroupId(1);
        group.setStudents(new ArrayList<>(List.of(user)));
        user.setGroups(new HashSet<>(Set.of(group)));

        when(userRepository.findByEmail("user@mail.com")).thenReturn(Optional.of(user));
        when(groupRepository.findById(1)).thenReturn(Optional.of(group));

        userService.addUserToGroup(request);

        verify(emailSenderService, never()).sendSimplInvationEmail(any(), any());
    }

    @Test
    void removeFromGroup_shouldRemoveUserAndDeleteGroupIfEmpty() {
        UserGroupRequest request = new UserGroupRequest("user@mail.com", 1);
        UserModel user = new UserModel();
        Group group = new Group();
        group.setGroupId(1);
        group.setStudents(new ArrayList<>(List.of(user)));
        user.setGroups(new HashSet<>(Set.of(group)));

        when(userRepository.findByEmail("user@mail.com")).thenReturn(Optional.of(user));
        when(groupRepository.findById(1)).thenReturn(Optional.of(group));

        userService.removeFromGroup(request);

        assertFalse(user.getGroups().contains(group));
        assertFalse(group.getStudents().contains(user));
        verify(groupRepository).deleteById(1);
    }

    @Test
    void getUsersByRole_shouldReturnPagedUsers() {
        Pageable pageable = PageRequest.of(1, 10);
        List<UserModel> users = List.of(new UserModel());

        when(userRepository.findByRole(eq(Roles.STUDENT), any(Pageable.class)))
                .thenReturn(new PageImpl<>(users));

        Iterable<UserModel> result = userService.getUsersByRole(Roles.STUDENT, pageable);
        assertEquals(users, result);
    }

    @Test
    void getUserByID_shouldReturnUser() throws SQLException {
        UserModel user = new UserModel();
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        assertEquals(user, userService.getUserByID(1));
    }

    @Test
    void getUserByID_shouldThrowSQLExceptionIfNotFound() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());
        assertThrows(SQLException.class, () -> userService.getUserByID(1));
    }

    @Test
    void saveNewUser_shouldSaveAndReturnUser() {
        UserModel user = new UserModel();
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user, userService.saveNewUser(user).get());
    }

    @Test
    void deleteUserById_shouldCallRepository() {
        userService.deleteUserById(5);
        verify(userRepository).deleteById(5);
    }
}
