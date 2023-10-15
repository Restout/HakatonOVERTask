package com.example.hakatonovertask.security.model;

import com.example.hakatonovertask.security.utils.Roles;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Table(name = "User")
@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
public class UserModel implements UserDetails {
    @Id
    @Column(name = "ID")
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
    @JsonProperty
    Roles role;
    @Column(name = "First_name")
    String firstName;
    @Column(name = "Last_name")
    String lastName;
    @Column(name = "Father_name")
    String fatherName;
    @Transient
    boolean expiredAccount;
    @Transient
    boolean lockedAccount;
    @Transient
    boolean enableAccount;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role);
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return expiredAccount;
    }

    @Override
    public boolean isAccountNonLocked() {
        return lockedAccount;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
