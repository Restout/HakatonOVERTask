package com.example.hakatonovertask.service;

import com.example.hakatonovertask.security.model.EnroleeModel;
import com.example.hakatonovertask.security.repository.EnroleeJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EnrolleService {
    @Autowired
    private EnroleeJpaRepository enroleeJpaRepository;

    public Optional<EnroleeModel> saveEnrolle(EnroleeModel enroleeModel) {
        enroleeJpaRepository.save(enroleeModel);
        return Optional.of(enroleeJpaRepository.findEnroleeModelById(enroleeModel.getId()));
    }
}
