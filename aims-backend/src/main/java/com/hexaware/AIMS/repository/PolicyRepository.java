package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Policy;
import com.hexaware.AIMS.model.enums.VehicleType;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyRepository extends JpaRepository<Policy, Integer> {
    List<Policy> findByVehicleType(VehicleType vehicleType);
    List<Policy> findByIsActiveTrue();
    List<Policy> findByVehicleTypeAndIsActiveTrue(VehicleType type);
}
