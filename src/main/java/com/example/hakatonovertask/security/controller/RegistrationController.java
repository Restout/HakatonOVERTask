package com.example.hakatonovertask.security.controller;

import com.example.hakatonovertask.security.model.EnroleeModel;
import com.example.hakatonovertask.service.EnrolleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import static com.example.hakatonovertask.security.utils.Validator.validate;

@RestController
public class RegistrationController {
    @Autowired
    private EnrolleService enrolleService;

    @PostMapping("/hakaton/registration")
    public ResponseEntity<EnroleeModel> registrateNewEnrolle(@RequestBody EnroleeModel enroleeModel) {
        if (validate(enroleeModel)) {
            return ResponseEntity
                    .status(400)
                    .body(null);
        }
        Optional<EnroleeModel> model = enrolleService.saveEnrolle(enroleeModel);
        if (model.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .build();
        }
        return ResponseEntity
                .ok()
                .body(model.get());
    }
}
