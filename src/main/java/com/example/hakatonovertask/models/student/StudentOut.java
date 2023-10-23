package com.example.hakatonovertask.models.student;

import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import lombok.Data;

import java.util.Date;

@Data
public class StudentOut {

    private Integer id;


    private Date birthday;

    private String phone;


    private String email;

    private Roles role;

    private String firstName;

    private String lastName;

    private String fatherName;
    private int recordBookId;
    private int groupID;


    public StudentOut(Student student) {
        UserModel userModel = student.getUser();
        this.id = student.getId();
        this.birthday = userModel.getBirthday();
        this.phone = userModel.getPhone();
        this.email = userModel.getEmail();
        this.role = userModel.getRole();
        this.firstName = userModel.getFirstName();
        this.lastName = userModel.getLastName();
        this.fatherName = userModel.getFatherName();
        this.recordBookId = student.getRecordBookId();
        this.groupID = student.getGroupID();
    }


}
