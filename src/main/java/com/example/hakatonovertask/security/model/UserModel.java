package com.example.hakatonovertask.security.model;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.security.utils.Roles;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Table(name = "User")
@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Embeddable
public class UserModel implements UserDetails {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(name = "Birthday")

    Date birthday;
    @Column(name = "Phone")

    String phone;
    @Column(name = "Password")

    String password;
    @Column(name = "Email")

    String email;
    @Column(name = "Role")
    @Enumerated(EnumType.STRING)
    Roles role=Roles.ENROLLEE;
    @Column(name = "First_name")
    String firstName;
    @Column(name = "Last_name")
    String lastName;
    @Column(name = "Father_name")
    String fatherName;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "UserGroups",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private Set<Group> groups = new HashSet<>();

    @Transient
    @JsonIgnore
    boolean expiredAccount;
    @Transient
    @JsonIgnore

    boolean lockedAccount;
    @Transient
    @JsonIgnore

    boolean enableAccount;

    @Override
    @JsonIgnore

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role);
    }

    @Override
    @JsonIgnore

    public String getUsername() {
        return email;
    }

    @Override
    @JsonIgnore

    public boolean isAccountNonExpired() {
        return expiredAccount;
    }

    @Override
    @JsonIgnore

    public boolean isAccountNonLocked() {
        return lockedAccount;
    }

    @Override
    @JsonIgnore

    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    @JsonIgnore

    public boolean isEnabled() {
        return false;
    }
}
