package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> getUserById(int userId) {
        return userRepository.findById(userId);
    }

    public String updateUserDetails(User existingUser, User updated) {
        existingUser.setFullName(updated.getFullName());
        existingUser.setAddress(updated.getAddress());
        userRepository.save(existingUser);
        return "Profile updated successfully.";
    }

    public String changePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "Password updated successfully.";
    }

    public String deleteUser(User user) {
        userRepository.delete(user);
        return "User deleted successfully.";
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
