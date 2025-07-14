package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.Role;
import com.hexaware.AIMS.repository.UserRepository;
import com.hexaware.AIMS.security.JWTCheck;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTCheck jwtCheck;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // REGISTER NEW USER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.badRequest().body("Email already registered");
            }

            user.setRole(Role.USER);

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok("Registration successful!");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                .badRequest()
                .body("Duplicate entry found. Please check Aadhaar, PAN, or Email.");
        } catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body("Something went wrong: " + e.getMessage());
        }
    }
    // LOGIN AND GENERATE JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            // Fetch user after successful authentication
            User user = userRepository.findByEmail(loginRequest.getEmail()).get();
            String token = jwtCheck.generateToken(user.getEmail());

            // Build response
            HashMap<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", user.getUserId());
            response.put("name", user.getFullName());
            response.put("email", user.getEmail());
            response.put("role", user.getRole().name());

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
