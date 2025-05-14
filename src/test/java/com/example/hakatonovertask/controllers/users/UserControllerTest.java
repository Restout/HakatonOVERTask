package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.groups.UserGroupRequest;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import com.example.hakatonovertask.service.users.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void shouldReturnUserById() throws Exception {
        UserModel user = new UserModel();
        user.setId(1);
        user.setEmail("email@test.com");

        when(userService.getUserByID(1)).thenReturn(user);

        mockMvc.perform(get("/api/auth/users/one?id=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("email@test.com"));
    }

    @Test
    void shouldReturnBadRequestWhenGetUserFails() throws Exception {
        when(userService.getUserByID(anyInt())).thenThrow(new SQLException());

        mockMvc.perform(get("/api/auth/users/one?id=123"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldAddUserSuccessfully() throws Exception {
        UserModel user = new UserModel();
        user.setId(1);
        user.setEmail("admin@mail.com");

        when(userService.saveNewUser(any(UserModel.class))).thenReturn(Optional.of(user));

        mockMvc.perform(post("/api/auth/users/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("admin@mail.com"));
    }

    @Test
    void shouldReturnBadRequestIfAddUserFails() throws Exception {
        UserModel user = new UserModel();
        user.setEmail("test@mail.com");

        when(userService.saveNewUser(any(UserModel.class))).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/auth/users/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldAddUserToGroup() throws Exception {
        UserGroupRequest request = new UserGroupRequest();
        request.setUserEmail("user@example.com");
        request.setGroupId(10);

        mockMvc.perform(put("/api/users/group")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(userService, times(1)).addUserToGroup(any(UserGroupRequest.class));
    }

    @Test
    void shouldRemoveUserFromGroup() throws Exception {
        UserGroupRequest request = new UserGroupRequest();
        request.setUserEmail("user@example.com");
        request.setGroupId(10);

        mockMvc.perform(delete("/api/users/group")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(userService, times(1)).removeFromGroup(any(UserGroupRequest.class));
    }

    @Test
    void shouldDeleteUser() throws Exception {
        mockMvc.perform(delete("/api/auth/users/delete?id=9"))
                .andExpect(status().isOk());

        verify(userService).deleteUserById(9);
    }
}