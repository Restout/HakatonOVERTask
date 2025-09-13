package com.example.hakatonovertask.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmailSenderServiceImplTest {

    private JavaMailSender javaMailSender;
    private EmailSenderServiceImpl emailSenderService;

    @BeforeEach
    void setUp() {
        javaMailSender = mock(JavaMailSender.class);
        emailSenderService = new EmailSenderServiceImpl(javaMailSender);
    }

    @Test
    void sendSimplInvationEmail_shouldSendEmailSuccessfully() {
        String to = "test@example.com";
        String groupName = "Dev Team";

        boolean result = emailSenderService.sendSimplInvationEmail(to, groupName);

        assertTrue(result);

        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(javaMailSender, times(1)).send(captor.capture());

        SimpleMailMessage sentMessage = captor.getValue();
        assertEquals(to, sentMessage.getTo()[0]);
        assertEquals("Приглашние в группу", sentMessage.getSubject());
        assertTrue(sentMessage.getText().contains(groupName));
    }

    @Test
    void sendSimplInvationEmail_shouldReturnFalseOnException() {
        String to = "fail@example.com";
        String groupName = "Fail Group";

        doThrow(new RuntimeException("Mail server error")).when(javaMailSender).send(any(SimpleMailMessage.class));

        boolean result = emailSenderService.sendSimplInvationEmail(to, groupName);

        assertFalse(result);
        verify(javaMailSender, times(1)).send(any(SimpleMailMessage.class));
    }
}