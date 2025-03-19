package com.example.hakatonovertask.mappers;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.GroupStudentOut;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface GroupMapper {
    GroupStudentOut fromGroupToGroupStudentDto(Group group);
}
