package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.scheldue.ScheldueDay;
import com.example.hakatonovertask.models.scheldue.ScheldueDayId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheldueRepository extends JpaRepository<ScheldueDay, ScheldueDayId> {
    List<ScheldueDay> getScheldueDaysByGroupGroupId(Integer groupid);
}
