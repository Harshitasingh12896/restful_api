package com.example.SpringMongodb.Controller;

import com.example.SpringMongodb.Entity.Student;
import com.example.SpringMongodb.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/Student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentCreateController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/save")
    public String saveStudent(@RequestBody Student student) {
        studentService.saveorUpdate(student);
        return student.getId();
    }
}
