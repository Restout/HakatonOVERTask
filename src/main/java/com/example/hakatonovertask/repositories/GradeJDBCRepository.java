package com.example.hakatonovertask.repositories;

import com.example.hakatonovertask.models.Grades;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class GradeJDBCRepository {
    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final String QUERY = "SELECT t.\"Grade\", l.\"LessonName\", m.\"DateEnd\" \n" +
            "FROM \"Tasks\" t\n" +
            "JOIN \"Materials\" m ON t.\"MaterialID\"=m.\"MaterialID\"\n" +
            "JOIN \"Container\" c ON m.\"ContainerID\"=c.\"ContainerID\"\n" +
            "JOIN  \"Student\" s ON c.\"ID\"=s.\"ID\"\n" +
            "JOIN \"Lesson\" l ON l.\"LessonID\"=c.\"LessonID\"\n" +
            "where s.\"ID\"= :studentId\n" +
            "LIMIT :size OFFSET :page;";

    public List<Grades> getGradesByStudentId(int studentId, int page, int size) {
        HashMap<String, Object> paramsMap = new HashMap<>();
        paramsMap.put("studentId", studentId);
        paramsMap.put("page", page * size);
        paramsMap.put("size", size);
        return namedParameterJdbcTemplate.query(QUERY, paramsMap, ((rs, rowNum) -> {
            return Grades.builder().grade(rs.getInt("Grade"))
                    .dateOfLesson(rs.getDate("DateEnd"))
                    .lessonName(rs.getString("LessonName")).build();
        }));
    }
}
