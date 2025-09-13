package com.example.hakatonovertask.controllers.users;

import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.models.student.StudentDao;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import com.example.hakatonovertask.service.users.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class StudentControllerTest {

    private MockMvc mockMvc;

    @Mock
    private StudentService studentService;

    @Mock
    private StudentJpaRepository studentJpaRepository;

    @InjectMocks
    private StudentController studentController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(studentController).build();
    }

    @Test
    void shouldReturnStudentIfFound() throws Exception {
        int studentId = 1;

        UserModel user = new UserModel();
        user.setId(studentId);
        user.setEmail("test@example.com");
        user.setFirstName("Ivan");
        user.setLastName("Ivanov");
        user.setFatherName("Ivanovich");
        user.setPhone("123456789");
        user.setBirthday(new Date());
        user.setRole(Roles.STUDENT);

        Student student = new Student();
        student.setId(studentId);
        student.setUser(user);
        student.setGroupID(10);
        student.setRecordBookId(20);

        when(studentJpaRepository.findById(studentId)).thenReturn(Optional.of(student));

        mockMvc.perform(get("/api/auth/user/data/student/{studentId}", studentId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(studentId))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.firstName").value("Ivan"));
    }

    @Test
    void shouldReturnBadRequestIfStudentNotFound() throws Exception {
        when(studentJpaRepository.findById(99)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/auth/user/data/student/99"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldReturnAllStudents() throws Exception {
        Student student1 = new Student();
        student1.setId(1);
        Student student2 = new Student();
        student2.setId(2);

        when(studentJpaRepository.findAll()).thenReturn(List.of(student1, student2));

        mockMvc.perform(get("/api/auth/user/data/student"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldCreateStudent() throws Exception {
        Student student = new Student();
        student.setId(123);

        when(studentService.saveStudent(any(Student.class))).thenReturn(Optional.of(student));

        mockMvc.perform(post("/api/auth/user/set/student")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(student)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(123));
    }

    @Test
    void shouldGrantStudent() throws Exception {
        Student student = new Student();
        student.setId(99);

        StudentDao dao = new StudentDao();
        dao.setId(99);
        dao.setGroupId(1);
        dao.setRecordBookId(1234);

        when(studentService.creatStudentFromUserAndSave(any(StudentDao.class))).thenReturn(Optional.of(student));

        mockMvc.perform(put("/api/auth/user/grand/student")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dao)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(99));
    }

    @Test
    void shouldReturnBadRequestWhenGrantFails() throws Exception {
        StudentDao dao = new StudentDao();
        dao.setId(1);
        dao.setGroupId(2);
        dao.setRecordBookId(3);

        when(studentService.creatStudentFromUserAndSave(any(StudentDao.class)))
                .thenThrow(new SQLException("fail"));

        mockMvc.perform(put("/api/auth/user/grand/student")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dao)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void shouldDeleteStudentById() throws Exception {
        int idToDelete = 10;

        doNothing().when(studentService).deleteStudentByID(idToDelete);

        mockMvc.perform(delete("/api/auth/user/delete/student")
                        .param("id", String.valueOf(idToDelete)))
                .andExpect(status().isOk());

        verify(studentService, times(1)).deleteStudentByID(idToDelete);
    }
}