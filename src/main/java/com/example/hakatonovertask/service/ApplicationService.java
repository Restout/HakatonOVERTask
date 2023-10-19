package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.applications.*;
import com.example.hakatonovertask.repositories.ApplicationRepository;
import com.example.hakatonovertask.repositories.CourseRepository;
import com.example.hakatonovertask.repositories.users.EnroleeJpaRepository;
import com.example.hakatonovertask.repositories.users.UserJpaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CourseRepository courseRepository;
    private final EnroleeJpaRepository enrolleeRepository;
    private final UserJpaRepository userJpaRepository;

    public List<ApplicationOut> listApplications() {
        List<Application> applicationList = applicationRepository.findAll();
        List<ApplicationOut> applicationRes = new ArrayList<>();
        for (var app : applicationList) {
            applicationRes.add(new ApplicationOut(
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
        return new ApplicationOutById(app.getApplicationId(),
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

    public ApplicationOutById createApplication(ApplicationIn applicationIn){
        log.info("arraived info {} {} {} {}", applicationIn.getMotivationLetter(), applicationIn.getMerits(), applicationIn.getID(), applicationIn.getCourseID());
        Application app = new Application(enrolleeRepository.getReferenceById(applicationIn.getID()),
                courseRepository.getReferenceById(applicationIn.getCourseID()),
                userJpaRepository.findByLastName(applicationIn.getChiefName().split(" ")[0]).getId(),
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
}
