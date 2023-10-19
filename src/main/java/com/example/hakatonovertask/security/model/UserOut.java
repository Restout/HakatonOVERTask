package com.example.hakatonovertask.security.model;

import com.example.hakatonovertask.security.utils.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOut {

    private Integer id;
    private Date birthday;
    private String phone;
    private String email;

    private Roles role = Roles.ENROLLEE;
    private String firstName;
    private String lastName;
    private String fatherName;

    public UserOut(UserModel userModel) {
        this.id = userModel.getId();
        this.birthday = userModel.getBirthday();
        this.phone = userModel.getPhone();
        this.email = userModel.getEmail();
        this.role = userModel.getRole();
        this.firstName = userModel.getFirstName();
        this.lastName = userModel.getLastName();
        this.fatherName = userModel.getFatherName();
    }
}
