package com.example.hakatonovertask.models;

import com.example.hakatonovertask.security.model.UserModel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name="SelectionCommittee")
public class SelectionCommittee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ID")
    @MapsId
    private UserModel user;
    /*@OneToMany(mappedBy = "selectionCommittee")
    private List<Course> course;*/

    public SelectionCommittee(int id, UserModel user) {
        this.id = id;
        this.user = user;
    }

    public SelectionCommittee(int id) {
        this.id = id;
    }
}
