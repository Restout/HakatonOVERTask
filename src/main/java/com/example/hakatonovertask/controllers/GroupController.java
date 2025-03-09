package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @GetMapping("/api/groups")
    public List<GroupOut> getGroups(@RequestParam("userId") Integer userId) {
        return groupService.getAll(userId);
    }

    @PostMapping("/api/auth/groups")
    public ResponseEntity<GroupOut> saveGroup(@RequestBody GroupAllInfo group) {
        return ResponseEntity.ok(groupService.saveGroup(group, null));
    }

    @PutMapping("/api/auth/groups/{groupId}")
    public ResponseEntity<GroupOut> updateGroup(@PathVariable("groupId") Integer groupId, @RequestBody GroupAllInfo group) {
        return ResponseEntity.ok(groupService.saveGroup(group, groupId));
    }

    @DeleteMapping("/api/auth/groups/{groupId}")
    public void deleteGroup(@PathVariable("groupId") Integer groupId) {
        groupService.deleteGroup(groupId);
    }
}
