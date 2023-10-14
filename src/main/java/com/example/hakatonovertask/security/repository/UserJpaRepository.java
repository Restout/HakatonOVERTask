package com.example.hakatonovertask.security.repository;

import com.example.hakatonovertask.security.model.EnroleeModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
interface UserJpaRepository extends CrudRepository<EnroleeModel, Integer> {
    public EnroleeModel findEnroleeModelById(int id);

}
