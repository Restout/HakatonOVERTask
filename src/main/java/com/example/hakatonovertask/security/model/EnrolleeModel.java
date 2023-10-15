package com.example.hakatonovertask.security.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="Enrollee")
public class EnrolleeModel {
    @Id
    @Column(name="ID")
    private Integer Id;
    @Column(name="NAME")

    private String name;
    @Column(name="PASSWORD")

    private char[] password;
    @Column(name="PHONE")

    private String phone;
    @Column(name = "LAST_NAME")


    private String lastName;
    @Column(name="EMAIL")

    private String email;
    @Column(name="BIRTHDAY")

    private Date birthday;

    /*public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    @Override
    public String getPassword() {
        return password.toString();
    }
*/
}
