package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
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
    public ResponseEntity<List<GroupOut>> getGroups(){

        return ResponseEntity.ok().body(groupService.getAll());
    }

    @PostMapping("/groups")
    public ResponseEntity<GroupOut> saveGroup(@RequestBody GroupAllInfo group){
        return ResponseEntity.ok(groupService.saveGroup(group,null));
    }

    @PutMapping("/groups/{groupId}")
    public ResponseEntity<GroupOut> updateGroup(@PathVariable("groupId") Integer groupId, @RequestBody GroupAllInfo group){
        return ResponseEntity.ok(groupService.saveGroup(group,groupId));
    }

    @DeleteMapping("/groups/{N}")
    public void deleteGroup(@PathVariable("N") Integer groupId){
        groupService.deleteGroup(groupId);
    }
}
