package com.example.SpringMongodb.Controller;

import com.example.SpringMongodb.Entity.Student;
import com.example.SpringMongodb.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/Student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentUpdateController {

    @Autowired
    private StudentService studentService;

    @PutMapping("/edit/{id}")
    public Student updateStudent(@RequestBody Student student,
                                 @PathVariable("id") String id) {

        student.setId(id);
        studentService.saveorUpdate(student);
        return student;
    }
}