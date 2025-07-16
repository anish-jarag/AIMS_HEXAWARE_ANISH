package com.hexaware.AIMS.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hexaware.AIMS.model.enums.VehicleType;

import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleId;

    @Column(nullable = false, unique = true)
    private String registrationNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType vehicleType; 

    private String make;   
    
    private String model;  

    private int yearOfManufacture;

    @ManyToOne
    @JsonIgnore
    private User owner;

    // Constructors
    public Vehicle() {}

    public Vehicle(String registrationNumber, VehicleType vehicleType, String make, String model, int yearOfManufacture, User owner) {
        this.registrationNumber = registrationNumber;
        this.vehicleType = vehicleType;
        this.make = make;
        this.model = model;
        this.yearOfManufacture = yearOfManufacture;
        this.owner = owner;
    }

    // Getters & Setters
    public int getVehicleId() { return vehicleId; }
    public void setVehicleId(int vehicleId) { this.vehicleId = vehicleId; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public VehicleType getVehicleType() { return vehicleType; }
    public void setVehicleType(VehicleType vehicleType) { this.vehicleType = vehicleType; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public int getYearOfManufacture() { return yearOfManufacture; }
    public void setYearOfManufacture(int yearOfManufacture) { this.yearOfManufacture = yearOfManufacture; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
}
