package com.example.hakatonovertask.security.utils;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum Roles {
    ENROLLEE("EnrollEe"),
    TEACHER("Teacher"),
    STUDENT("Student"),
    GUEST("Guest"),
    SELLECTION_COMMITE("SellectionCommite"),
    SUPERVISOR("Supervisor");
    private String role;

    Roles(String s) {
        role = s;
    }

}
