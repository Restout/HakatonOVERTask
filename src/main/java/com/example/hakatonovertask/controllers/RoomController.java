package com.example.hakatonovertask.controllers;

import lombok.Generated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
public class RoomController {

    private final Map<String, Room> rooms = new HashMap<>();

    @GetMapping("/api/rooms")
    public List<Room> getAllRooms() {
        return new ArrayList<>(rooms.values());
    }

    @GetMapping("/api/rooms/{roomId}")
    public Room getRoomById(@PathVariable String roomId) {
        if (!rooms.containsKey(roomId)) {
            throw new RuntimeException("Комната не найдена");
        }
        return rooms.get(roomId);
    }

    @PostMapping("/api/rooms")
    public Room createRoom(@RequestBody RoomRequest request) {
        String roomId = UUID.randomUUID().toString();
        Room room = new Room(
            roomId,
            request.getName(),
            new ArrayList<>(),
            LocalDateTime.now().toString(),
            request.getCreatedBy()
        );
        rooms.put(roomId, room);
        return room;
    }

    @PutMapping("/api/rooms/join")
    public Room joinRoom(@RequestBody RoomJoinRequest request) {
        if (!rooms.containsKey(request.getRoomId())) {
            throw new RuntimeException("Комната не найдена");
        }
        
        Room room = rooms.get(request.getRoomId());
        if (!room.getParticipants().contains(String.valueOf(request.getUserId()))) {
            room.getParticipants().add(String.valueOf(request.getUserId()));
        }
        
        return room;
    }

    @PutMapping("/api/rooms/leave")
    public Room leaveRoom(@RequestBody RoomJoinRequest request) {
        if (!rooms.containsKey(request.getRoomId())) {
            throw new RuntimeException("Комната не найдена");
        }
        
        Room room = rooms.get(request.getRoomId());
        room.getParticipants().remove(String.valueOf(request.getUserId()));
        
        return room;
    }

    @Generated
    public static class Room {
        private String id;
        private String name;
        private List<String> participants;
        private String createdAt;
        private int createdBy;

        public Room(String id, String name, List<String> participants, String createdAt, int createdBy) {
            this.id = id;
            this.name = name;
            this.participants = participants;
            this.createdAt = createdAt;
            this.createdBy = createdBy;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<String> getParticipants() {
            return participants;
        }

        public void setParticipants(List<String> participants) {
            this.participants = participants;
        }

        public String getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(String createdAt) {
            this.createdAt = createdAt;
        }

        public int getCreatedBy() {
            return createdBy;
        }

        public void setCreatedBy(int createdBy) {
            this.createdBy = createdBy;
        }
    }
    @Generated
    public static class RoomRequest {
        private String name;
        private int createdBy;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getCreatedBy() {
            return createdBy;
        }

        public void setCreatedBy(int createdBy) {
            this.createdBy = createdBy;
        }
    }

    @Generated
    public static class RoomJoinRequest {
        private String roomId;
        private int userId;

        public String getRoomId() {
            return roomId;
        }

        public void setRoomId(String roomId) {
            this.roomId = roomId;
        }

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }
    }
} 