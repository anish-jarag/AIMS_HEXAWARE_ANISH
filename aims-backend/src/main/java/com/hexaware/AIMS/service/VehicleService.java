package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.Vehicle;
import com.hexaware.AIMS.repository.VehicleRepository;
import com.hexaware.AIMS.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public String addVehicle(Vehicle vehicle, User owner) {
        vehicle.setOwner(owner);
        if (vehicleRepository.findByRegistrationNumber(vehicle.getRegistrationNumber()).isPresent()) {
            return "Vehicle with this registration number already exists.";
        }
        vehicleRepository.save(vehicle);
        return "Vehicle added successfully.";
    }

    public List<Vehicle> getVehiclesByUser(User user) {
        return vehicleRepository.findByOwner(user);
    }

    public String deleteVehicle(int vehicleId, User user) {
        Optional<Vehicle> optionalVehicle = vehicleRepository.findById(vehicleId);
        if (optionalVehicle.isEmpty()) return "Vehicle not found.";

        Vehicle vehicle = optionalVehicle.get();
        if (vehicle.getOwner().getUserId() != user.getUserId()) {
            return "You are not authorized to delete this vehicle.";
        }

        vehicleRepository.delete(vehicle);
        return "Vehicle deleted successfully.";
    }
}
