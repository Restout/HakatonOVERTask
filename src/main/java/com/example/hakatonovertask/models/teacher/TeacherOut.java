package com.example.hakatonovertask.models.teacher;

import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import lombok.Data;

import java.util.Date;

@Data
public class TeacherOut {
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
    private String academicDegree;
    private String academicTitle;

    public TeacherOut(Teacher teacher) {
        UserModel user = teacher.getUser();
        this.id = teacher.getTeacherId();
        this.birthday = user.getBirthday();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.fatherName = user.getFatherName();
        this.academicDegree = teacher.getAcademicDegree();
        this.academicTitle = teacher.getAcademicTitle();
    }
}
