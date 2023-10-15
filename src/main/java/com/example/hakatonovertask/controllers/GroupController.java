package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.GroupAllDTO;
import com.example.hakatonovertask.models.groups.GroupDTO;
import com.example.hakatonovertask.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GroupController {
    private GroupService groupService;
    @Autowired
    public void setGroupService(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/groups")
    public ResponseEntity<List<GroupDTO>> getGroups(){

        return ResponseEntity.ok().body(groupService.getAll());
    }

    @PostMapping("/groups")
    public ResponseEntity<GroupDTO> saveGroup(@RequestBody GroupAllDTO group){
        return ResponseEntity.ok(groupService.saveGroup(group,null));
    }

    @PutMapping("/groups/{groupId}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable("groupId") Integer groupId,@RequestBody GroupAllDTO group){
        return ResponseEntity.ok(groupService.saveGroup(group,groupId));
    }

    @DeleteMapping("/groups/{N}")
    public void deleteGroup(@PathVariable("N") Integer groupId){
        groupService.deleteGroup(groupId);
    }
}
