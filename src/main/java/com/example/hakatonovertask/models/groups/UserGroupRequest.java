package com.example.hakatonovertask.models.groups;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserGroupRequest {
    @NotBlank
    private String userEmail;
    @NotNull
    private Integer groupId;
}
