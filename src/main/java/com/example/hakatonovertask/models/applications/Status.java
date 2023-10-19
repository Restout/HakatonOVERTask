package com.example.hakatonovertask.models.applications;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum Status {
    FOR_APPROVAL("На согласовании"),
    UNDER_CONSIDERATION("На рассмотрении"),
    REJECTED("Отклонена"),
    REGISTERED("Зарегистрирована");

    private final String description;

    Status(String description) {
        this.description = description;
    }
}
