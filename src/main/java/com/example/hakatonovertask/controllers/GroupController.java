package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.models.groups.GroupStudentOut;
import com.example.hakatonovertask.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @GetMapping("/api/groups")
    public List<GroupOut> getGroups(@RequestParam("userId") Integer userId) {
        return groupService.getAll(userId);
    }

    @GetMapping("/api/groups/{groupId}")
    public GroupStudentOut getGroup(@PathVariable("groupId") Integer groupId) {
        return groupService.getGroup(groupId);
    }

    @PostMapping("/api/groups")
    public GroupOut saveGroup(@RequestBody GroupAllInfo group) {
        return groupService.saveGroup(group);
    }

    @PutMapping("/api/auth/groups/{groupId}")
    public ResponseEntity<GroupOut> updateGroup(@PathVariable("groupId") Integer groupId, @RequestBody GroupAllInfo group) {
        return ResponseEntity.ok(groupService.changeExistingGroup(group, groupId));
    }

    @DeleteMapping("/api/auth/groups/{groupId}")
    public void deleteGroup(@PathVariable("groupId") Integer groupId) {
        groupService.deleteGroup(groupId);
    }
}
