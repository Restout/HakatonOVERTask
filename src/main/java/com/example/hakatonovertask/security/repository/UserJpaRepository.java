package com.example.hakatonovertask.security.repository;

import com.example.hakatonovertask.security.model.UserModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserJpaRepository extends CrudRepository<UserModel,Integer> {

}
