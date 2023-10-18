package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.applications.Application;
import com.example.hakatonovertask.models.applications.ApplicationIn;
import com.example.hakatonovertask.models.applications.ApplicationOut;
import com.example.hakatonovertask.models.course.Course;
import com.example.hakatonovertask.repositories.ApplicationRepository;
import com.example.hakatonovertask.repositories.CourseRepository;
import com.example.hakatonovertask.repositories.EnrolleeRepository;
import com.example.hakatonovertask.security.repository.UserRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import javax.xml.bind.annotation.XmlType;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CourseRepository courseRepository;
    private final EnrolleeRepository enrolleeRepository;

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
                    app.getStatus()
            ));

        }
        return applicationRes;
    }

    public ApplicationOut getApplicationById(Integer id){
        Application app = new Application();
        app = applicationRepository.findById(id).orElse(null);
        if (app == null) return null;
        return new ApplicationOut(app.getApplicationId(),
                app.getCourse().getName(),
                app.getEnrollee().getUserId().getFirstName(),
                app.getEnrollee().getUserId().getLastName(),
                app.getEnrollee().getUserId().getFatherName(),
                app.getStatus());
    }

    public void deleteApplication(int id){applicationRepository.deleteById(id);}

    public ApplicationOut createApplication(ApplicationIn applicationIn){
        log.info("Saving new {}", applicationIn);
        Application app = new Application(enrolleeRepository.getReferenceById(applicationIn.getID()),
                                            courseRepository.getReferenceById(applicationIn.getCourseID()),
                                            applicationIn.getStatus());

        applicationRepository.save(app);
        log.info("Saving new {}", app);
        return new ApplicationOut(app.getApplicationId(),
                app.getCourse().getName(),
                app.getEnrollee().getUserId().getFirstName(),
                app.getEnrollee().getUserId().getLastName(),
                app.getEnrollee().getUserId().getFatherName(),
                app.getStatus());
    }
}
