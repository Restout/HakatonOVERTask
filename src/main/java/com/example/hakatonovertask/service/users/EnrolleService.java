package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.Enrollee;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.repositories.users.EnroleeJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.utils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class EnrolleService {
    @Autowired
    private EnroleeJpaRepository enroleeJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;

    public Optional<Enrollee> saveEnrolle(Enrollee enroleeModel) {
        return Optional.of(enroleeJpaRepository.save(enroleeModel));
    }

    public Optional<Enrollee> creatEnrolleFromeUserAndSave(int id) throws SQLException {
        Optional<UserModel> userModelOptional = userJpaRepository.findById(id);
        if (userModelOptional.isEmpty()) {
            throw new SQLException("No user with such id in DB");
        }
        UserModel userModel = userModelOptional.get();
        Enrollee enrollee = new Enrollee(userModel.getId(), userModel);
        userJpaRepository.updateRole(Roles.ENROLLEE, userModel.getId());
        return Optional.of(enroleeJpaRepository.save(enrollee));
    }

    public void deleteEnrolleeByID(int id) {
        enroleeJpaRepository.deleteById(id);//Application delete Bug mb Fix later, then application will be done
    }
}
