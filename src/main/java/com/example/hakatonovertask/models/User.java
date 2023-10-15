package com.example.hakatonovertask.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name="\"users\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int userid;
    @Column(name = "firstname")
    private String firsName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name="Role")
    private int roles;
    @Column(name="Birthday")
    private Date birthday;
    @Column(name = "Phone")
    private String phone;
    @Column(name = "Email")
    private String email;
    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Teacher teacher;
}
