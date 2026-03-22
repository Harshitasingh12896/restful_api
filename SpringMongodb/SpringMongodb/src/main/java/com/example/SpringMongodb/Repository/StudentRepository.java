package com.example.SpringMongodb.Repository;

import com.example.SpringMongodb.Entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student,String>
   {
}
