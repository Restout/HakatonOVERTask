package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.groups.GroupAllInfo;
import com.example.hakatonovertask.models.groups.GroupOut;
import com.example.hakatonovertask.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class GroupController {
    private GroupService groupService;
    @Autowired
    public void setGroupService(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/api/groups")
    public ResponseEntity<List<GroupOut>> getGroups(@RequestParam("courseId") Optional<Integer> courseId){
        if(courseId.isEmpty()){
            return ResponseEntity.ok().body(groupService.getAll());
        }else {
            return ResponseEntity.ok().body(groupService.getGroupByCourse(courseId.orElse(null)));
        }

    }

    @PostMapping("/api/auth/groups")
    @PreAuthorize("hasAnyAuthority('ADMIN','SUPERVISOR')")
    public ResponseEntity<GroupOut> saveGroup(@RequestBody GroupAllInfo group){
        try {
            return ResponseEntity.ok(groupService.saveGroup(group, null));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PreAuthorize("hasAnyAuthority('ADMIN','SUPERVISOR')")
    @PutMapping("/api/auth/groups/{groupId}")
    public ResponseEntity<GroupOut> updateGroup(@PathVariable("groupId") Integer groupId, @RequestBody GroupAllInfo group){
        try {
            return ResponseEntity.ok(groupService.saveGroup(group, groupId));
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PreAuthorize("hasAnyAuthority('ADMIN','SUPERVISOR')")
    @DeleteMapping("/api/auth/groups/{N}")
    public void deleteGroup(@PathVariable("N") Integer groupId){
        groupService.deleteGroup(groupId);
    }
}
