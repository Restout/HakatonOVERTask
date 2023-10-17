package com.example.hakatonovertask.security.repository;

import com.example.hakatonovertask.security.model.Enrollee;
import com.example.hakatonovertask.security.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public
interface EnroleeJpaRepository extends JpaRepository<Enrollee, Integer> {
    public Enrollee findEnroleeModelById(@NonNull int id);

}
