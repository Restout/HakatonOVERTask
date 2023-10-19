package com.example.hakatonovertask.models;

import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Supervisior")
public class Supervisor {
    @Id
    @Column(name = "ID")
    private int id;
    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "ID")
    private UserModel user;
}
