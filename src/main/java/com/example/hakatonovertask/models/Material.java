package com.example.hakatonovertask.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
@NoArgsConstructor
@Entity
@Data
@Table(name = "Materials")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaterialID")
    private Integer materialId;
    @ManyToOne
    @JoinColumn(name = "ContainerID")
    @JsonIgnore
    private Container container;
    @Column(name = "DateStart")
    private Date dateStart;
    @Column(name = "DateEnd")
    private Date dateEnd;
    @Column(name = "Description")
    private String description;
    @Column(name = "Title")
    private String title;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Practical",
            joinColumns = {@JoinColumn(name = "MaterialID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> practical;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Theoretical",
            joinColumns = {@JoinColumn(name = "MaterialID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> theoretical;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "Independent",
            joinColumns = {@JoinColumn(name = "MaterialID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> independent;
    @OneToMany(mappedBy = "material",cascade = CascadeType.ALL)
    private List<Task> tasks;

}
