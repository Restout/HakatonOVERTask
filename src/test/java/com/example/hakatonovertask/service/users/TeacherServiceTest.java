package com.example.hakatonovertask.service.users;

import com.example.hakatonovertask.models.teacher.Teacher;
import com.example.hakatonovertask.models.teacher.TeacherDao;
import com.example.hakatonovertask.repositories.users.TeacherJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TeacherServiceTest {

    private TeacherJpaRepository teacherJpaRepository;
    private UserJpaRepository userJpaRepository;
    private TeacherService teacherService;

    @BeforeEach
    void setUp() {
        teacherJpaRepository = mock(TeacherJpaRepository.class);
        userJpaRepository = mock(UserJpaRepository.class);
        teacherService = new TeacherService(teacherJpaRepository, userJpaRepository);
    }

    @Test
    void saveTeacher_shouldSaveAndReturnTeacher() {
        Teacher teacher = new Teacher();
        when(teacherJpaRepository.save(teacher)).thenReturn(teacher);

        Optional<Teacher> result = teacherService.saveTeacher(teacher);

        assertTrue(result.isPresent());
        assertEquals(teacher, result.get());
    }

    @Test
    void createTeacherFromUserAndSave_shouldCreateAndReturnTeacher() throws SQLException {
        TeacherDao teacherDao = new TeacherDao();
        teacherDao.setId(1);
        teacherDao.setAcademicDegree("PhD");
        teacherDao.setAcademicTitle("Professor");

        UserModel user = new UserModel();
        user.setId(1);

        when(userJpaRepository.findById(1)).thenReturn(Optional.of(user));
        when(teacherJpaRepository.save(any(Teacher.class))).thenAnswer(i -> i.getArguments()[0]);

        Optional<Teacher> result = teacherService.creatTeacherFromUserAndSave(teacherDao);

        assertTrue(result.isPresent());
        Teacher savedTeacher = result.get();
        assertEquals(1, savedTeacher.getTeacherId());
        assertEquals(user, savedTeacher.getUser());
        assertEquals("PhD", savedTeacher.getAcademicDegree());
        assertEquals("Professor", savedTeacher.getAcademicTitle());

        verify(userJpaRepository).deleteById(1);
        assertEquals(Roles.TEACHER, user.getRole());
    }

    @Test
    void createTeacherFromUserAndSave_shouldThrowIfUserNotFound() {
        TeacherDao teacherDao = new TeacherDao();
        teacherDao.setId(2);

        when(userJpaRepository.findById(2)).thenReturn(Optional.empty());

        assertThrows(SQLException.class, () -> teacherService.creatTeacherFromUserAndSave(teacherDao));
    }
}
