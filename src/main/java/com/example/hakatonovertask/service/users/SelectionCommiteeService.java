package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.SelectionCommittee;
import com.example.hakatonovertask.repositories.users.SelectionCommiteeJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class SelectionCommiteeService {
    @Autowired
    private SelectionCommiteeJpaRepository selectionCommiteeJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;

    public Optional<SelectionCommittee> saveSelComm(SelectionCommittee enroleeModel) {
        return Optional.of(selectionCommiteeJpaRepository.save(enroleeModel));
    }

    public Optional<SelectionCommittee> creatSelComFromUserAndSave(int id) throws SQLException {
        Optional<UserModel> userModelOptional = userJpaRepository.findById(id);
        if (userModelOptional.isEmpty()) {
            throw new SQLException("No user with such id in DB");
        }
        UserModel userModel = userModelOptional.get();
        SelectionCommittee selectionCommittee = new SelectionCommittee(userModel.getId(), userModel);
        userJpaRepository.deleteById(id);
        return Optional.of(selectionCommiteeJpaRepository.save(selectionCommittee));
    }

}
