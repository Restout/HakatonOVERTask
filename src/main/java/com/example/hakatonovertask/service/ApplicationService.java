package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Enrollee;
import com.example.hakatonovertask.models.applications.*;
import com.example.hakatonovertask.repositories.ApplicationRepository;
import com.example.hakatonovertask.repositories.CourseRepository;
import com.example.hakatonovertask.repositories.users.EnroleeJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import com.example.hakatonovertask.security.model.UserModel;
import com.example.hakatonovertask.security.utils.Roles;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CourseRepository courseRepository;
    private final EnroleeJpaRepository enrolleeRepository;
    private final UserJpaRepository userJpaRepository;
    private java.lang.Exception Exception;

    public List<ApplicationOut> listApplications(int id, Pageable pageable, AtomicLong count) {
        pageable = pageable.withPage(pageable.getPageNumber() - 1);
        Page<Application> applicationList = Page.empty();
        List<ApplicationOut> applicationRes = new ArrayList<>();
        UserModel user = userJpaRepository.getReferenceById(id);
        applicationList = switch (user.getRole()) {
            case MANAGER -> applicationRepository.findAllByStatusAndChiefID(Status.FOR_APPROVAL, id, pageable);
            case SELLECTION_COMMITE -> applicationRepository.findAllByStatus(Status.UNDER_CONSIDERATION, pageable);
            case ADMIN -> applicationRepository.findAll(pageable);
            default -> applicationList;
        };
        count.set(applicationList.getTotalElements());
        for (var app : applicationList) {
            applicationRes.add(new ApplicationOut(
                    app.getEnrollee().getUserId().getId(),
                    app.getApplicationId(),
                    app.getCourse().getCourseName(),
                    app.getEnrollee().getUserId().getFirstName(),
                    app.getEnrollee().getUserId().getLastName(),
                    app.getEnrollee().getUserId().getFatherName(),
                    app.getEnrollee().getUserId().getEmail(),
                    app.getEnrollee().getUserId().getPhone(),
                    app.getStatus().getDescription(),
                    app.getDateOfChange()));

        }
        return applicationRes;
    }

    public ApplicationOutById getApplicationById(Integer id){
        Application app = applicationRepository.findById(id).orElse(null);
        if (app == null) return null;
        return new ApplicationOutById(app.getEnrollee().getUserId().getId(),
                app.getApplicationId(),
                app.getCourse().getCourseName(),
                app.getEnrollee().getUserId().getFirstName(),
                app.getEnrollee().getUserId().getLastName(),
                app.getEnrollee().getUserId().getFatherName(),
                userJpaRepository.findById(app.getChiefID()).get().getLastName(),
                app.getCurrentPosition(),
                app.getDepartmentName(),
                app.getExperience(),
                app.getMerits(),
                app.getMotivationLetter(),
                app.getStatus().getDescription(),
                app.getDateOfChange());
    }

    public void deleteApplication(int id){applicationRepository.deleteById(id);}

    public ApplicationOutById createApplication(ApplicationIn applicationIn) throws Exception {
        UserModel manager = userJpaRepository.findByLastName(applicationIn.getChiefName().split(" ")[0]);
        if (!manager.getRole().equals(Roles.MANAGER)) throw Exception;
        Application app = new Application(enrolleeRepository.getReferenceById(applicationIn.getID()),
                courseRepository.getReferenceById(applicationIn.getCourseID()),
                manager.getId(),
                applicationIn.getCurrentPosition(),
                applicationIn.getDepartmentName(),
                applicationIn.getExperience(),
                applicationIn.getMotivationLetter(),
                applicationIn.getMerits());

        applicationRepository.save(app);
        return getApplicationById(app.getApplicationId());
    }

    public void approveApplication(int id, String answer) {
        Application app = applicationRepository.findById(id).orElse(null);
        if (app != null) {
            switch (answer) {
                case "Зарегистрирована":
                    app.setStatus(Status.REGISTERED);
                    break;
                case "Отклонена":
                    app.setStatus(Status.REJECTED);
                    break;
                case "На рассмотрении":
                    app.setStatus(Status.UNDER_CONSIDERATION);
                    break;
                default:
                    app.setStatus(Status.FOR_APPROVAL);
            }
            app.setDateOfChange(new Date());
            applicationRepository.save(app);
        }
    }

    public List<ApplicationOut> listStudentApplications(int userId) {
        List<ApplicationOut> applicationRes = new ArrayList<>();
        Enrollee user = enrolleeRepository.getReferenceById(userId);
        List<Application> applicationList = applicationRepository.findAllByEnrollee(user);
        for (var app : applicationList) {
            applicationRes.add(new ApplicationOut(
                    app.getEnrollee().getUserId().getId(),
                    app.getApplicationId(),
                    app.getCourse().getCourseName(),
                    app.getEnrollee().getUserId().getFirstName(),
                    app.getEnrollee().getUserId().getLastName(),
                    app.getEnrollee().getUserId().getFatherName(),
                    app.getEnrollee().getUserId().getEmail(),
                    app.getEnrollee().getUserId().getPhone(),
                    app.getStatus().getDescription(),
                    app.getDateOfChange()));
        }
        return applicationRes;
    }
}
