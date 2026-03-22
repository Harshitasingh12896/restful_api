package com.example.SpringMongodb.Service;

import com.example.SpringMongodb.Entity.Student;
import com.example.SpringMongodb.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;


    public void saveorUpdate(Student students){
        repository.save(students);

    }
    public Iterable<Student>listAll(){
        return this.repository.findAll();
    }
    public void deleteStudent(String id){
        repository.deleteById(id);
    }
    public Student getStudentByID(String student){
        return repository.findById(student).orElse(null);
    }
}
