package com.example.SpringMongodb.Controller;

import com.example.SpringMongodb.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/Student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentDeleteController {

    @Autowired
    private StudentService studentService;

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable("id") String id) {
        studentService.deleteStudent(id);
    }
}
