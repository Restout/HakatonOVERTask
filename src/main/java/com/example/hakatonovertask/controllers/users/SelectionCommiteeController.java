package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.controllers.BasicController;
import com.example.hakatonovertask.models.SelectionCommittee;
import org.springframework.http.ResponseEntity;

public class SelectionCommiteeController implements BaseUserController<SelectionCommittee,Integer> {
    @Override
    public ResponseEntity<Iterable<SelectionCommittee>> getAllRoleUsers() {
        return null;
    }

    @Override
    public ResponseEntity<SelectionCommittee> creatRoleUser(SelectionCommittee role) {
        return null;
    }

    @Override
    public ResponseEntity<SelectionCommittee> grandUserToRole(Integer roleDao) {
        return null;
    }

    @Override
    public void deleteRoleUserById(int id) {

    }
}
