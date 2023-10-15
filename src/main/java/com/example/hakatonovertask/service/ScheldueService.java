package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.scheldue.ScheldueDayDTO;
import com.example.hakatonovertask.repositories.ScheldueRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScheldueService {
    private ScheldueRepository scheldueRepository;
    @Autowired
    public void setScheldueRepository(ScheldueRepository scheldueRepository) {
        this.scheldueRepository = scheldueRepository;
    }
    @Transactional
    public List<ScheldueDayDTO> getScheldueByGroup(Integer groupId){
        System.out.println( scheldueRepository.getScheldueDaysByGroupGroupId(groupId));
        List<ScheldueDayDTO> a = new ArrayList<ScheldueDayDTO>();
        return a;
    }
}
