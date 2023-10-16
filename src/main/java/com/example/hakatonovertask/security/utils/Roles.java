package com.example.hakatonovertask.security.utils;

import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

@Getter
@ToString
public enum Roles implements GrantedAuthority {
    ENROLLEE("Enrollee"),
    TEACHER("Teacher"),
    STUDENT("Student"),
    GUEST("Guest"),
    SELLECTION_COMMITE("SellectionCommite"),
    SUPERVISOR("Supervisor");
    private String authority;

    Roles(String s) {
        authority = s;
    }

}
