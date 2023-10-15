package com.example.hakatonovertask.service;

import com.example.hakatonovertask.security.model.EnrolleeModel;
import com.example.hakatonovertask.security.repository.EnroleeJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnrolleService {
    @Autowired
    private EnroleeJpaRepository enroleeJpaRepository;

    public Optional<EnrolleeModel> saveEnrolle(EnrolleeModel enroleeModel) {
        return Optional.of(enroleeJpaRepository.save(enroleeModel));
    }
}
