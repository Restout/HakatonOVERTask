package com.example.hakatonovertask.service;

import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.repository.UserJpaRepository;
import com.example.hakatonovertask.security.utils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserJpaRepository userRepository;

    public Iterable<UserModel> getAllUsers() {
        return userRepository.findAll();
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

    public Iterable<UserModel> getUsersByRole(Roles role) throws HttpClientErrorException {
        try {
            validateRole(role);
        } catch (HttpClientErrorException e) {
            throw e;
        }
        return userRepository.findByRole(role);
    }


    public Optional<UserModel> saveNewUser(UserModel userModel) {
        return Optional.of(userRepository.save(userModel));
    }

}
