package com.example.hakatonovertask.models;

import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Enrollee")
public class Enrollee {
    @Id
    @Column(name = "ID")
    int id;
    @MapsId
    @OneToOne(cascade =CascadeType.ALL)
    @JoinColumn(name = "ID")
    private UserModel userId;
}
