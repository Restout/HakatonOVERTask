package com.example.hakatonovertask.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class StaticController {
    @GetMapping(value = {"/{somepath1}/{somepath2}", "/{somepath1}"})
    public String getIndexPage(@PathVariable(required = false) String somepath1,@PathVariable(required = false) String somepath2) {
        return "index";
    }
}
