package com.example.SpringMongodb.Controller;

import com.example.SpringMongodb.Entity.User;
import com.example.SpringMongodb.Repository.UserRepository;
import com.example.SpringMongodb.Config.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ SIGNUP
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        // 🔥 hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepo.save(user);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User user) {

        Optional<User> optionalUser = userRepo.findByEmail(user.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User existingUser = optionalUser.get();

        // ✅ CORRECT PASSWORD CHECK
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(existingUser.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }

}