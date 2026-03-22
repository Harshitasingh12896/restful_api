package com.example.SpringMongodb.Controller;

import com.example.SpringMongodb.Entity.Student;
import com.example.SpringMongodb.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(
        origins = "http://localhost:3000",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@RequestMapping("api/v1/Student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/save")
    public String saveStudent(@RequestBody Student students)
    {
        studentService.saveorUpdate(students);
        return students.getId();
    }

    @GetMapping("/getAll")
    public Iterable<Student> getStudents()
    {
        return studentService.listAll();
    }

    @PutMapping("/edit/{id}")
    public Student update(@RequestBody Student student, @PathVariable("id") String id)
    {
        student.setId(id);
        studentService.saveorUpdate(student);
        return student;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable("id") String id)
    {
        studentService.deleteStudent(id);
    }

    @GetMapping("/student/{id}")
    public Student getStudents(@PathVariable("id") String student)
    {
        return studentService.getStudentByID(student);
    }
}