package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Attendance.Attendance;
import com.example.hakatonovertask.models.Attendance.AttendanceDAO;
import com.example.hakatonovertask.models.Attendance.AttendanceOut;
import com.example.hakatonovertask.models.groups.Group;
import com.example.hakatonovertask.models.student.Student;
import com.example.hakatonovertask.repositories.AttendanceRepository;
import com.example.hakatonovertask.repositories.ScheldueRepository;
import com.example.hakatonovertask.repositories.users.StudentJpaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final ScheldueRepository scheldueRepository;
    private final StudentJpaRepository studentJpaRepository;

    public List<AttendanceOut> getListStudent(int scheduledId) {
        List<AttendanceOut> attendanceOutList = new ArrayList<>();
        Group group = scheldueRepository.findById(scheduledId).get().getGroup();
        int groupId = group.getGroupId();
        List<Student> students = studentJpaRepository.findAllByGroupGroupId(groupId);
        for (var stu : students) {
            attendanceOutList.add(new AttendanceOut(stu.getId()));
        }
        return attendanceOutList;
    }

    public List<AttendanceDAO> getAttendacne(int scheduledId) {
        List<AttendanceDAO> attendanceDAOList = new ArrayList<>();
        List<Attendance> attendanceList = attendanceRepository.findAllByScheduleDayScheldueId(scheduledId);
        for (var att : attendanceList) {
            attendanceDAOList.add(new AttendanceDAO(att.getStudent().getId(), att.isHas_been()));
        }
        return attendanceDAOList;
    }

    public List<AttendanceDAO> createAttendance(List<AttendanceDAO> list, int scheduledId) {
        for (var att : list) {
            attendanceRepository.save(new Attendance(att.isHas_been(),
                    studentJpaRepository.findById(att.getStudentId()).get(),
                    scheldueRepository.findById(scheduledId).get()));
        }
        return getAttendacne(scheduledId);
    }

    @Transactional
    public void deleteAttendance(int scheduledId) { attendanceRepository.deleteAllByScheduleDayScheldueId(scheduledId);}
}
