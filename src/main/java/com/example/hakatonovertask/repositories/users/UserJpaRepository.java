package com.example.hakatonovertask.repositories.users;

import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserJpaRepository extends JpaRepository<UserModel, Integer> {
     Page<UserModel> findByRole(Roles role, Pageable pageable);


     @Modifying
     @Transactional
     @Query("UPDATE UserModel u SET u.role= :role WHERE u.id= :id")
     int updateRole(@Param("role") Roles role, @Param("id") int id);

     long countAllByRole(Roles role);

     UserModel findByEmail(String Email);
     UserModel findByLastName(String LastName);

}
