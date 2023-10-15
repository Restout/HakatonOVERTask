package com.example.hakatonovertask.security.model;

import com.example.hakatonovertask.security.utils.Roles;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.management.relation.Role;
import java.util.Date;

@Table(name = "User")
@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
public class UserModel {
    @Id
    @Column(name = "ID")
    Integer id;
    @Column(name = "Birthday")

    Date birthday;
    @Column(name = "Phone")

    String phone;
    @Column(name = "Password")

    String password;
    @Column(name = "Email")

    String email;
    @Column(name = "Role")
    @JsonProperty
    Roles role;
    @Column(name = "First_name")
    String firstName;
    @Column(name = "Last_name")
    String lastName;
    @Column(name = "Father_name")
    String fatherName;

}
