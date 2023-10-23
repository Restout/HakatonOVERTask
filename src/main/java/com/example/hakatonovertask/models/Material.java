package com.example.hakatonovertask.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
@NoArgsConstructor
@Entity
@Data
@Table(name = "Materials")
@AllArgsConstructor
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaterialID")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
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
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @ManyToMany(cascade = {CascadeType.ALL,CascadeType.MERGE})
    @JoinTable(
            name = "Practical",
            joinColumns = {@JoinColumn(name = "MaterialID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> practical;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @ManyToMany(cascade = {CascadeType.ALL,CascadeType.MERGE})
    @JoinTable(
            name = "Theoretical",
            joinColumns = {@JoinColumn(name = "MaterialID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> theoretical;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @ManyToMany(cascade = {CascadeType.ALL,CascadeType.MERGE})
    @JoinTable(
            name = "Independent",
            joinColumns = {@JoinColumn(name = "MaterialID")},
            inverseJoinColumns = {@JoinColumn(name = "FileID")}
    )
    private List<Files> independent;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @OneToMany(mappedBy = "material",cascade = CascadeType.ALL)
    private List<Task> tasks;

}
