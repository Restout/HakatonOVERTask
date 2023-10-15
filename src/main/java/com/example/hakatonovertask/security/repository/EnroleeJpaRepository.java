package com.example.hakatonovertask.security.repository;

import com.example.hakatonovertask.security.model.EnrolleeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public
interface EnroleeJpaRepository extends JpaRepository<EnrolleeModel, Integer> {
    public EnrolleeModel findEnroleeModelById(@NonNull int id);

}
