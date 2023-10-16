package com.example.hakatonovertask.service;

import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.repository.UserJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserJpaRepository userRepository;

    public Optional<UserModel> saveNewUser(UserModel userModel) {
        return Optional.of(userRepository.save(userModel));
    }

}
