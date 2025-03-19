package com.example.hakatonovertask.controllers;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.models.groups.GroupStudentOut;
import com.example.hakatonovertask.security.model.UserOut;
import com.example.hakatonovertask.service.GroupService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.fasterxml.jackson.databind.ObjectMapper;

@ExtendWith(MockitoExtension.class)
class GroupControllerTest {
    private MockMvc mockMvc;

    @InjectMocks
    private GroupController groupController;

    @Mock
    private GroupService groupService;

    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(groupController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("Test getGroupsOfUser endpoint")
    public void testGetGroups() throws Exception {
        Integer userId = 1;

        List<GroupOut> groups = Arrays.asList(
                createGroupOut(1, "Math Group"),
                createGroupOut(2, "Physics Group")
        );

        when(groupService.getAll(userId)).thenReturn(groups);

        mockMvc.perform(get("/api/groups")
                        .param("userId", userId.toString())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].groupId", is(1)))
                .andExpect(jsonPath("$[0].groupName", is("Math Group")))
                .andExpect(jsonPath("$[1].groupId", is(2)))
                .andExpect(jsonPath("$[1].groupName", is("Physics Group")));

        verify(groupService).getAll(userId);
    }

    @Test
    @DisplayName("Test getGroupById endpoint")
    public void testGetGroup() throws Exception {
        Integer groupId = 1;

        GroupStudentOut groupStudentOut = createGroupStudentOut(
                groupId,
                "Math Group",
                createUserOut(10, "teacher@example.com", "Teacher", "Smith"),
                Arrays.asList(
                        createUserOut(101, "student1@example.com", "John", "Doe"),
                        createUserOut(102, "student2@example.com", "Jane", "Doe")
                )
        );

        when(groupService.getGroup(groupId)).thenReturn(groupStudentOut);

        mockMvc.perform(get("/api/groups/{groupId}", groupId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.groupId", is(1)))
                .andExpect(jsonPath("$.groupName", is("Math Group")))
                .andExpect(jsonPath("$.creator.id", is(10)))
                .andExpect(jsonPath("$.creator.email", is("teacher@example.com")))
                .andExpect(jsonPath("$.students", hasSize(2)))
                .andExpect(jsonPath("$.students[0].id", is(101)))
                .andExpect(jsonPath("$.students[1].id", is(102)));

        verify(groupService).getGroup(groupId);
    }

    @Test
    @DisplayName("Test saveGroup endpoint")
    public void testSaveGroup() throws Exception {
        GroupAllInfo groupAllInfo = new GroupAllInfo();
        groupAllInfo.setCreatorId(10);
        groupAllInfo.setGroupName("New Group");

        GroupOut savedGroup = createGroupOut(1, "New Group");

        when(groupService.saveGroup(ArgumentMatchers.any(GroupAllInfo.class))).thenReturn(savedGroup);

        mockMvc.perform(post("/api/groups")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(groupAllInfo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.groupId", is(1)))
                .andExpect(jsonPath("$.groupName", is("New Group")));

        verify(groupService).saveGroup(ArgumentMatchers.any(GroupAllInfo.class));
    }

    @Test
    @DisplayName("Test updateGroup endpoint")
    public void testUpdateGroup() throws Exception {
        Integer groupId = 1;

        GroupAllInfo groupAllInfo = new GroupAllInfo();
        groupAllInfo.setCreatorId(10);
        groupAllInfo.setGroupName("Updated Group");

        GroupOut updatedGroup = createGroupOut(groupId, "Updated Group");

        when(groupService.changeExistingGroup(ArgumentMatchers.any(GroupAllInfo.class), eq(groupId))).thenReturn(updatedGroup);

        mockMvc.perform(put("/api/auth/groups/{groupId}", groupId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(groupAllInfo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.groupId", is(1)))
                .andExpect(jsonPath("$.groupName", is("Updated Group")));

        verify(groupService).changeExistingGroup(ArgumentMatchers.any(GroupAllInfo.class), eq(groupId));
    }

    @Test
    @DisplayName("Test deleteGroup endpoint")
    public void testDeleteGroup() throws Exception {
        Integer groupId = 1;

        mockMvc.perform(delete("/api/auth/groups/{groupId}", groupId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(groupService).deleteGroup(groupId);
    }

    private GroupOut createGroupOut(int groupId, String groupName) {
        GroupOut groupOut = new GroupOut();
        groupOut.setGroupId(groupId);
        groupOut.setGroupName(groupName);
        return groupOut;
    }

    private UserOut createUserOut(Integer id, String email, String firstName, String lastName) {
        UserOut userOut = mock(UserOut.class);
        when(userOut.getId()).thenReturn(id);
        when(userOut.getEmail()).thenReturn(email);
        when(userOut.getFirstName()).thenReturn(firstName);
        when(userOut.getLastName()).thenReturn(lastName);
        return userOut;
    }

    private GroupStudentOut createGroupStudentOut(int groupId, String groupName, UserOut creator, List<UserOut> students) {
        GroupStudentOut groupStudentOut = new GroupStudentOut();
        groupStudentOut.setGroupId(groupId);
        groupStudentOut.setGroupName(groupName);
        groupStudentOut.setCreator(creator);
        groupStudentOut.setStudents(students);
        return groupStudentOut;
    }
}