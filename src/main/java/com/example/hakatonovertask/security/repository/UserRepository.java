package com.example.hakatonovertask.security.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.Optional;

@Repository
public class UserRepository {
    @Autowired
    NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final String SAVE_QUERY=("SELECT * FROM \"USER\" WHERE \"Email\" LIKE ?");

    public Optional<UserDetails> getUserByEmailName(String usernameId) {
        StringBuilder query = new StringBuilder();
        query.append("SELECT * ")
                .append("FROM \"User\" ")
                .append("WHERE \"Email\" LIKE '")
                .append(usernameId+"'");
        return namedParameterJdbcTemplate.query(query.toString(), (rs, rowNum) -> User.builder()
                        .username(rs.getString("Email"))
                        .password(rs.getString("Password"))
                        .authorities(Collections.singleton(new SimpleGrantedAuthority(rs.getString("Role"))))
                        .build())
                .stream()
                .findFirst();
    }
}
