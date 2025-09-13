package com.example.hakatonovertask.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class RoomControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private RoomController roomController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        roomController = new RoomController();
        mockMvc = MockMvcBuilders.standaloneSetup(roomController).build();
    }

    @Test
    void shouldCreateRoomSuccessfully() throws Exception {
        RoomController.RoomRequest request = new RoomController.RoomRequest();
        request.setName("Test Room");
        request.setCreatedBy(1);

        mockMvc.perform(post("/api/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Room"))
                .andExpect(jsonPath("$.createdBy").value(1));
    }

    @Test
    void shouldReturnAllRooms() throws Exception {
        // Создаем одну комнату
        RoomController.RoomRequest request = new RoomController.RoomRequest();
        request.setName("Room 1");
        request.setCreatedBy(5);

        mockMvc.perform(post("/api/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/rooms"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void shouldGetRoomById() throws Exception {
        RoomController.RoomRequest request = new RoomController.RoomRequest();
        request.setName("My Room");
        request.setCreatedBy(7);

        String content = mockMvc.perform(post("/api/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        String roomId = objectMapper.readTree(content).get("id").asText();

        mockMvc.perform(get("/api/rooms/" + roomId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("My Room"));
    }

    @Test
    void shouldJoinAndLeaveRoom() throws Exception {
        // Create room
        RoomController.RoomRequest createRequest = new RoomController.RoomRequest();
        createRequest.setName("Room X");
        createRequest.setCreatedBy(10);

        String content = mockMvc.perform(post("/api/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andReturn().getResponse().getContentAsString();

        String roomId = objectMapper.readTree(content).get("id").asText();

        // Join room
        RoomController.RoomJoinRequest joinRequest = new RoomController.RoomJoinRequest();
        joinRequest.setRoomId(roomId);
        joinRequest.setUserId(99);

        mockMvc.perform(put("/api/rooms/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(joinRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.participants[0]").value("99"));

        // Leave room
        mockMvc.perform(put("/api/rooms/leave")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(joinRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.participants").isEmpty());
    }

    @Test
    void shouldReturnErrorForUnknownRoom() {
        assertThrows(ServletException.class, () -> mockMvc.perform(get("/api/rooms/" + UUID.randomUUID()))
                .andExpect(status().isInternalServerError()));
    }
}