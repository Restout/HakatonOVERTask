package com.example.hakatonovertask.models.applications;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum Status {
    FOR_APPROVAL("В согласовании"),
    REJECTED("Отклонена"),
    REGISTERED("Зарегистрирована");

    private String description;

    Status(String description) {
        this.description = description;
    }
}
