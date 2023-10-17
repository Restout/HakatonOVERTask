package com.example.hakatonovertask.repositories.users;

import com.example.hakatonovertask.models.Enrollee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

@Repository
public
interface EnroleeJpaRepository extends CrudRepository<Enrollee, Integer> {

}
