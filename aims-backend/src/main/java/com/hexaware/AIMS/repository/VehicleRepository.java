package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.Vehicle;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    List<Vehicle> findByOwner(User owner);
    Optional<Vehicle> findByRegistrationNumber(String registrationNumber);
}
