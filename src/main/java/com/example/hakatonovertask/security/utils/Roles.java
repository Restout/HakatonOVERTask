package com.example.hakatonovertask.security.utils;

import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

@Getter
@ToString
public enum Roles implements GrantedAuthority {
    ENROLLEE("ENROLLEE"),
    TEACHER("TEACHER"),
    STUDENT("STUDENT"),
    ADMIN("ADMIN"),
    SELLECTION_COMMITE("SELLECTION_COMMITE"),
    SUPERVISOR("SUPERVISOR"),
    MANAGER("MANAGER");
    private final String authority;

    Roles(String s) {
        authority = s;
    }

}
