package com.hexaware.AIMS.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hexaware.AIMS.model.enums.Role;

@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(nullable = false, unique = true)
    private String aadhaarNumber;

    @Column(nullable = false, unique = true)
    private String panNumber;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // USER or OFFICER

    // Constructors
    public User() {}

    public User(String fullName, String address, LocalDate dateOfBirth, String aadhaarNumber,
                String panNumber, String email, String password, Role role) {
        this.fullName = fullName;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.aadhaarNumber = aadhaarNumber;
        this.panNumber = panNumber;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters & Setters
    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAadhaarNumber() { return aadhaarNumber; }
    public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }

    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
