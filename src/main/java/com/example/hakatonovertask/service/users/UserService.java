package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.groups.UserGroupRequest;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import com.example.hakatonovertask.service.EmailSenderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.sql.SQLException;
import java.util.Optional;

import static org.springframework.util.CollectionUtils.isEmpty;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserJpaRepository userRepository;
    private final GroupRepository groupRepository;
    private final EmailSenderService emailSenderService;


    public Iterable<UserModel> getAllUsers(Pageable page) {
        page = page.withPage(page.getPageNumber() - 1);
        return userRepository.findAll(page).getContent();
    }

    public long getCountOfUsers() {
        return userRepository.count();
    }

    public long getCountOfUsersByRole(Roles role) {
        try {
            validateRole(role);
        } catch (HttpClientErrorException e) {
            throw e;
        }
        return userRepository.countAllByRole(role);
    }

    @Transactional
    public void addUserToGroup(UserGroupRequest request) {
        var user = userRepository.findByEmail(request.getUserEmail())
                .orElseThrow(EntityNotFoundException::new);
        var group = groupRepository.findById(request.getGroupId())
                .orElseThrow(EntityNotFoundException::new);

        if (group.getStudents().contains(user)) {
            log.info("Пользователь {} уже состоит в группе {}", user.getFirstName(), group.getGroupName());
            return;
        }

        addUserToGroup(user, group);
        emailSenderService.sendSimplInvationEmail(user.getEmail(), group.getGroupName());
    }

    @Transactional
    public void removeFromGroup(UserGroupRequest request) {
        var user = userRepository.findByEmail(request.getUserEmail())
                .orElseThrow(EntityNotFoundException::new);
        var group = groupRepository.findById(request.getGroupId())
                .orElseThrow(EntityNotFoundException::new);

        user.getGroups().remove(group);
        group.getStudents().remove(user);

        deleteGroupIfNoUsers(group);
    }

    public Iterable<UserModel> getUsersByRole(Roles role, Pageable page) throws HttpClientErrorException {
        try {
            validateRole(role);
        } catch (HttpClientErrorException e) {
            throw e;
        }
        page = page.withPage(page.getPageNumber() - 1);
        return userRepository.findByRole(role, page).getContent();
    }

    public UserModel getUserByID(int id) throws SQLException {
        Optional<UserModel> userModel = userRepository.findById(id);
        if (userModel.isEmpty()) {
            throw new SQLException("No Such User");
        }
        return userModel.get();
    }

    public Optional<UserModel> saveNewUser(UserModel userModel) {
        return Optional.of(userRepository.save(userModel));
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    private void deleteGroupIfNoUsers(Group group) {
        if (isEmpty(group.getStudents())) {
            groupRepository.deleteById(group.getGroupId());
        }
    }

    private static void validateRole(Roles role) {
        boolean isRole = false;
        for (Roles value : Roles.values()) {
            if (role.equals(value)) {
                isRole = true;
                break;
            }
        }
        if (!isRole) {
            throw new HttpClientErrorException(HttpStatusCode.valueOf(404));
        }
    }

    private void addUserToGroup(UserModel user, Group group) {
        user.getGroups().add(group);
        group.getStudents().add(user);
    }
}
