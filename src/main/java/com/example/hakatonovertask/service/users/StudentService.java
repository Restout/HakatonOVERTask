package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.models.student.StudentDao;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentJpaRepository studentJpaRepository;
    @Autowired
    private UserJpaRepository userJpaRepository;
    @Autowired
    private GroupRepository groupRepository;

    public Optional<Student> saveStudent(Student student) {
        return Optional.of(studentJpaRepository.save(student));
    }

    public Optional<Student> creatStudentFromUserAndSave(StudentDao studentDao) throws SQLException {
        Optional<UserModel> userModelOptional = userJpaRepository.findById(studentDao.getId());
        if (userModelOptional.isEmpty()) {
            throw new SQLException("No user with such id in DB");
        }
        UserModel userModel = userModelOptional.get();
        userModel.setRole(Roles.STUDENT);
        userJpaRepository.deleteById(studentDao.getId());
        Student student = new Student(userModel.getId(), userModel, studentDao.getRecordBookId(), studentDao.getGroupId(),
                groupRepository.findById(studentDao.getGroupId()).get());
        return Optional.of(studentJpaRepository.save(student));
    }

    public void deleteStudentByID(int id) {
        studentJpaRepository.deleteById(id);//Application delete Bug mb Fix later, then application will be done
    }
}
