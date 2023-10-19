package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserJpaRepository userRepository;

    public Iterable<UserModel> getAllUsers(Pageable page) {
        return userRepository.findAll(page).getContent();
    }

    public long getCountOfUsers() {
        return userRepository.count();
    }

    public long getCountOfUsersByRole(Roles role) {
        try {
            validateRole(role);
        } catch (HttpClientErrorException e) {
            throw e;
        }
        return userRepository.countAllByRole(role);
    }

    private static void validateRole(Roles role) {
        boolean isRole = false;
        for (Roles value : Roles.values()) {
            if (role.equals(value)) {
                isRole = true;
                break;
            }

        }
        if (!isRole) {
            throw new HttpClientErrorException(HttpStatusCode.valueOf(404));
        }
    }

    public Iterable<UserModel> getUsersByRole(Roles role, Pageable page) throws HttpClientErrorException {
        try {
            validateRole(role);
        } catch (HttpClientErrorException e) {
            throw e;
        }
        return userRepository.findByRole(role, page).getContent();
    }

    public UserModel getUserByID(int id) throws SQLException {
        Optional<UserModel> userModel = userRepository.findById(id);
        if (userModel.isEmpty()) {
            throw new SQLException("No Such User");
        }
        return userModel.get();
    }

    public Optional<UserModel> saveNewUser(UserModel userModel) {
        return Optional.of(userRepository.save(userModel));
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

}
