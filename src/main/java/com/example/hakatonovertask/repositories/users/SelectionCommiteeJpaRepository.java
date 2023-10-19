package com.example.hakatonovertask.repositories.users;

import com.example.hakatonovertask.models.SelectionCommittee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelectionCommiteeJpaRepository extends CrudRepository<SelectionCommittee, Integer> {

}
