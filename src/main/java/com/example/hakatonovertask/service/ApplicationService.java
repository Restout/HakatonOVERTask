package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.applications.Application;
import com.example.hakatonovertask.models.applications.ApplicationIn;
import com.example.hakatonovertask.models.applications.ApplicationOut;
import com.example.hakatonovertask.models.applications.Status;
import com.example.hakatonovertask.repositories.ApplicationRepository;
import com.example.hakatonovertask.repositories.CourseRepository;
import com.example.hakatonovertask.repositories.users.EnroleeJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CourseRepository courseRepository;
    private final EnroleeJpaRepository enrolleeRepository;

    public List<ApplicationOut> listApplications() {
        List<Application> applicationList = applicationRepository.findAll();
        List<ApplicationOut> applicationRes = new ArrayList<>();
        for (var app : applicationList) {
            applicationRes.add(new ApplicationOut(
                    app.getApplicationId(),
                    app.getCourse().getName(),
                    app.getEnrollee().getUserId().getFirstName(),
                    app.getEnrollee().getUserId().getLastName(),
                    app.getEnrollee().getUserId().getFatherName(),
                    app.getStatus().getDescription()
            ));

        }
        return applicationRes;
    }

    public ApplicationOut getApplicationById(Integer id){
        Application app = applicationRepository.findById(id).orElse(null);
        if (app == null) return null;
        return new ApplicationOut(app.getApplicationId(),
                app.getCourse().getName(),
                app.getEnrollee().getUserId().getFirstName(),
                app.getEnrollee().getUserId().getLastName(),
                app.getEnrollee().getUserId().getFatherName(),
                app.getStatus().getDescription());
    }

    public void deleteApplication(int id){applicationRepository.deleteById(id);}

    public ApplicationOut createApplication(ApplicationIn applicationIn){
        Application app = new Application(enrolleeRepository.getReferenceById(applicationIn.getID()),
                courseRepository.getReferenceById(applicationIn.getCourseID()),
                applicationIn.getStatus());

        applicationRepository.save(app);
        return getApplicationById(app.getApplicationId());
    }

    public void approveApplication(int id, boolean answer) {
        Application app = applicationRepository.findById(id).orElse(null);
        if (app != null) {
            if (answer) {
                app.setStatus(Status.REGISTERED);
            }
            else {
                app.setStatus(Status.REJECTED);
            }
            applicationRepository.save(app);
        }
    }
}
