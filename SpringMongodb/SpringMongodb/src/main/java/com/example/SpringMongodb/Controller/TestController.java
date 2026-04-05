package com.example.SpringMongodb.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/user")
    public String userApi() {
        return "Hello USER ✅";
    }

    @GetMapping("/admin")
    public String adminApi() {
        return "Hello ADMIN 🔥";
    }
}





