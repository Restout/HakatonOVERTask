package com.example.hakatonovertask.service;

public interface EmailSenderService {
    boolean sendSimplInvationEmail(String toEmail, String groupName);
}
