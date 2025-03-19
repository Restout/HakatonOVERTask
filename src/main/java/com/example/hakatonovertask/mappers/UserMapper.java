package com.example.hakatonovertask.mappers;

import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.model.UserOut;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserOut fromUserToUserOutDto(UserModel user);
}
