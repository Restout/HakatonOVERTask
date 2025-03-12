package com.example.hakatonovertask.service.impl;

import com.example.hakatonovertask.service.EmailSenderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailSenderServiceImpl implements EmailSenderService {
    private static final String INVITE_SUBJECT = "Приглашние в группу";
    private static final String INVITE_TEMPLATE = """
            Уведомляем вас о том, что бы были приглашенны в группу %s!
                        
            Если вам ничего об этом неизвестно, в целях вашей безопасности, самостоятельно покиньте группу с помощью инструментов сервиса!
                        
            С уважением Diplom-Techs!
            """;

    private final JavaMailSender javaMailSender;

    @Override
    public boolean sendSimplInvationEmail(String toEmail, String groupName) {
        var simpleMessage = createSimpleMessage(toEmail, groupName);

        try {
            javaMailSender.send(simpleMessage);
            return true;
        } catch (Exception e) {
            log.error("Ошибка при отправке письма", e);
            return false;
        }

    }

    private SimpleMailMessage createSimpleMessage(String toEmail, String groupName) {
        var simpleMessage = new SimpleMailMessage();
        simpleMessage.setTo(toEmail);
        simpleMessage.setSubject(INVITE_SUBJECT);
        simpleMessage.setText(String.format(INVITE_TEMPLATE, groupName));
        return simpleMessage;
    }
}
