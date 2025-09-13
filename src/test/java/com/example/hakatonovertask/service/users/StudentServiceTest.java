package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.models.student.StudentDao;
import com.example.hakatonovertask.repositories.GroupRepository;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.sql.SQLException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StudentServiceTest {

    private StudentJpaRepository studentJpaRepository;
    private UserJpaRepository userJpaRepository;
    private GroupRepository groupRepository;
    private StudentService studentService;

    @BeforeEach
    void setUp() {
        studentJpaRepository = mock(StudentJpaRepository.class);
        userJpaRepository = mock(UserJpaRepository.class);
        groupRepository = mock(GroupRepository.class);

        studentService = new StudentService(studentJpaRepository, userJpaRepository, groupRepository);
    }

    @Test
    void saveStudent_shouldReturnSavedStudent() {
        Student student = mock(Student.class);
        when(studentJpaRepository.save(student)).thenReturn(student);

        Optional<Student> result = studentService.saveStudent(student);

        assertTrue(result.isPresent());
        assertEquals(student, result.get());
        verify(studentJpaRepository).save(student);
    }

    @Test
    void creatStudentFromUserAndSave_shouldSaveNewStudent() throws SQLException {
        int userId = 1;
        int groupId = 2;
        StudentDao studentDao = new StudentDao();
        studentDao.setId(userId);
        studentDao.setGroupId(groupId);
        studentDao.setRecordBookId(123);

        UserModel userModel = new UserModel();
        userModel.setId(userId);

        Group group = new Group();
        when(userJpaRepository.findById(userId)).thenReturn(Optional.of(userModel));
        when(groupRepository.findById(groupId)).thenReturn(Optional.of(group));

        ArgumentCaptor<Student> studentCaptor = ArgumentCaptor.forClass(Student.class);
        Student savedStudent = mock(Student.class);
        when(studentJpaRepository.save(any(Student.class))).thenReturn(savedStudent);

        Optional<Student> result = studentService.creatStudentFromUserAndSave(studentDao);

        assertTrue(result.isPresent());
        assertEquals(savedStudent, result.get());

        verify(userJpaRepository).findById(userId);
        verify(groupRepository).findById(groupId);
        verify(userJpaRepository).deleteById(userId);
        verify(studentJpaRepository).save(studentCaptor.capture());

        Student created = studentCaptor.getValue();
        assertEquals(userId, created.getId());
        assertEquals(123, created.getRecordBookId());
        assertEquals(group, created.getGroup());
    }

    @Test
    void creatStudentFromUserAndSave_shouldThrowSQLExceptionIfUserNotFound() {
        StudentDao studentDao = new StudentDao();
        studentDao.setId(1);

        when(userJpaRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(SQLException.class, () -> studentService.creatStudentFromUserAndSave(studentDao));
    }

    @Test
    void deleteStudentByID_shouldCallRepository() {
        int studentId = 42;
        studentService.deleteStudentByID(studentId);
        verify(studentJpaRepository).deleteById(studentId);
    }
}
