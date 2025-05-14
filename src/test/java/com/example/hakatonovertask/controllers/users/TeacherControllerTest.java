package com.example.hakatonovertask.controllers.users;

import static org.junit.jupiter.api.Assertions.*;

import com.example.hakatonovertask.models.teacher.Teacher;
import com.example.hakatonovertask.models.teacher.TeacherDao;
import com.example.hakatonovertask.repositories.users.TeacherJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import com.example.hakatonovertask.service.users.TeacherService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.SQLException;
import java.util.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class TeacherControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TeacherService teacherService;

    @Mock
    private TeacherJpaRepository teacherJpaRepository;

    @InjectMocks
    private TeacherController teacherController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(teacherController).build();
    }

    @Test
    void shouldReturnTeacherIfFound() throws Exception {
        int id = 1;

        UserModel user = new UserModel();
        user.setId(id);
        user.setEmail("teacher@example.com");
        user.setFirstName("Anna");
        user.setLastName("Ivanova");
        user.setPhone("9999999");
        user.setBirthday(new Date());
        user.setRole(Roles.TEACHER);

        Teacher teacher = new Teacher();
        teacher.setTeacherId(id);
        teacher.setUser(user);
        teacher.setAcademicDegree("PhD");
        teacher.setAcademicTitle("Professor");

        when(teacherJpaRepository.findById(id)).thenReturn(Optional.of(teacher));

        mockMvc.perform(get("/api/auth/user/data/teacher/{teacherId}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("teacher@example.com"))
                .andExpect(jsonPath("$.academicDegree").value("PhD"));
    }

    @Test
    void shouldReturnBadRequestIfTeacherNotFound() throws Exception {
        when(teacherJpaRepository.findById(100)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/auth/user/data/teacher/100"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnAllTeachers() throws Exception {
        Teacher t1 = new Teacher();
        t1.setTeacherId(1);
        Teacher t2 = new Teacher();
        t2.setTeacherId(2);

        when(teacherJpaRepository.findAll()).thenReturn(List.of(t1, t2));

        mockMvc.perform(get("/api/auth/user/data/teacher"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldCreateTeacher() throws Exception {
        Teacher teacher = new Teacher();
        teacher.setTeacherId(55);

        when(teacherService.saveTeacher(any(Teacher.class))).thenReturn(Optional.of(teacher));

        mockMvc.perform(post("/api/auth/user/set/teacher")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(teacher)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.teacherId").value(55));
    }

    @Test
    void shouldGrantTeacher() throws Exception {
        Teacher teacher = new Teacher();
        teacher.setTeacherId(77);

        TeacherDao dao = new TeacherDao();
        dao.setId(77);
        dao.setAcademicDegree("PhD");
        dao.setAcademicTitle("Assoc. Prof.");

        when(teacherService.creatTeacherFromUserAndSave(any(TeacherDao.class)))
                .thenReturn(Optional.of(teacher));

        mockMvc.perform(put("/api/auth/user/grand/teacher")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dao)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.teacherId").value(77));
    }

    @Test
    void shouldReturnBadRequestWhenGrantFails() throws Exception {
        TeacherDao dao = new TeacherDao();
        dao.setId(22);
        dao.setAcademicDegree("None");
        dao.setAcademicTitle("None");

        when(teacherService.creatTeacherFromUserAndSave(any(TeacherDao.class)))
                .thenThrow(new SQLException("fail"));

        mockMvc.perform(put("/api/auth/user/grand/teacher")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dao)))
                .andExpect(status().isBadRequest());
    }
}