package com.example.SpringMongodb.Controller;

import com.example.SpringMongodb.Entity.Student;
import com.example.SpringMongodb.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/Student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentReadController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/getAll")
    public Iterable<Student> getStudents() {
        return studentService.listAll();
    }

    @GetMapping("/student/{id}")
    public Student getStudentById(@PathVariable("id") String id) {
        return studentService.getStudentByID(id);
    }
}
