package com.example.hakatonovertask.models.teacher;

import com.example.hakatonovertask.models.LessonTeacher;
import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Teacher")
public class Teacher {
    @Id
    @Column(name = "ID")
    private int teacherId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ID")
    @MapsId
    private UserModel user;
    @Column(name="AcademicDegree")
    private String academicDegree;
    @Column(name = "AcademicTitle")
    private String academicTitle;
    /*@OneToMany(mappedBy = "teacher")
    private List<LessonTeacher> lessons;*/

  /*  public Teacher(int teacherId) {
        this.teacherId = teacherId;
    }*/
}
