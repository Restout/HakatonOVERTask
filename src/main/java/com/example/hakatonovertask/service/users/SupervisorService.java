package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.Supervisor;
import com.example.hakatonovertask.repositories.users.SupervisorJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class SupervisorService {
    @Autowired
    private SupervisorJpaRepository supervisorJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;

    public Optional<Supervisor> saveSupervisor(Supervisor supervisor) {
        return Optional.of(supervisorJpaRepository.save(supervisor));
    }

    public Optional<Supervisor> creatSupervisorFromUserAndSave(Integer id) throws SQLException {
        Optional<UserModel> userModelOptional = userJpaRepository.findById(id);
        if (userModelOptional.isEmpty()) {
            throw new SQLException("No user with such id in DB");
        }
        UserModel userModel = userModelOptional.get();
        userModel.setRole(Roles.SUPERVISOR);
        Supervisor supervisor = new Supervisor(userModel.getId(), userModel);
        userJpaRepository.deleteById(id);
        return Optional.of(supervisor);
    }
}
