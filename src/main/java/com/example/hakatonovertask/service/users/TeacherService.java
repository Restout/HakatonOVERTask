package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.teacher.Teacher;
import com.example.hakatonovertask.models.teacher.TeacherDao;
import com.example.hakatonovertask.repositories.users.TeacherJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private TeacherJpaRepository teacherJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;

    public Optional<Teacher> saveTeacher(Teacher teacher) {
        return Optional.of(teacherJpaRepository.save(teacher));
    }

    public Optional<Teacher> creatTeacherFromUserAndSave(TeacherDao teacherDao) throws SQLException {
        Optional<UserModel> userModelOptional = userJpaRepository.findById(teacherDao.getId());
        if (userModelOptional.isEmpty()) {
            throw new SQLException("No user with such id in DB");
        }
        UserModel userModel = userModelOptional.get();
        Teacher teacher = new Teacher(userModel.getId(), userModel, teacherDao.getAcademicDegree(), teacherDao.getAcademicTitle());
        userJpaRepository.deleteById(teacherDao.getId());
        return Optional.of(teacherJpaRepository.save(teacher));
    }
}
