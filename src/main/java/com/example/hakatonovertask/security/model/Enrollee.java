package com.example.hakatonovertask.security.model;

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
    /*@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;*/
    @Id
    @Column(name = "ID")
    int id;
    @MapsId
    @OneToOne(cascade =CascadeType.ALL)
    @JoinColumn(name = "ID")
    private UserModel userId;
}
