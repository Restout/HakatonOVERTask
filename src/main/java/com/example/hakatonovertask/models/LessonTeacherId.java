package com.example.hakatonovertask.models;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonTeacherId implements Serializable {
    private int LessonID;
    @ManyToOne()
    @JoinColumn(name = "ID")
    private Teacher teacher;
}
