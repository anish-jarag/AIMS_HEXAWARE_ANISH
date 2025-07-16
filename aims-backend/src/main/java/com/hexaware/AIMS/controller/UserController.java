package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.service.UserService;
import com.hexaware.AIMS.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.getUserByEmail(userDetails.getUsername())
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("User not found"));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                                                @RequestBody User updatedUser) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

        return ResponseEntity.ok(userService.updateUserDetails(userOpt.get(), updatedUser));
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@AuthenticationPrincipal UserDetails userDetails,
                                                 @RequestBody Map<String, String> body) {
        String newPassword = body.get("newPassword");
        if (newPassword == null || newPassword.isBlank()) {
            return ResponseEntity.badRequest().body("Password cannot be blank.");
        }

        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

        return ResponseEntity.ok(userService.changePassword(userOpt.get(), newPassword));
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteUserById(@PathVariable int userId) {
        Optional<User> userOpt = userService.getUserById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

        return ResponseEntity.ok(userService.deleteUser(userOpt.get()));
    }


    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
