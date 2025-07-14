package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.Policy;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.Vehicle;
import com.hexaware.AIMS.model.enums.VehicleType;
import com.hexaware.AIMS.service.VehicleService;
import com.hexaware.AIMS.service.PolicyService;
import com.hexaware.AIMS.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private UserService userService;

    @Autowired
    private PolicyService policyService;

    @PostMapping("/add")
    public ResponseEntity<String> addVehicle(@RequestBody Vehicle vehicle,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

        String result = vehicleService.addVehicle(vehicle, userOpt.get());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Vehicle>> getMyVehicles(@AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) return ResponseEntity.status(404).build();

        return ResponseEntity.ok(vehicleService.getVehiclesByUser(userOpt.get()));
    }

    @DeleteMapping("/delete/{vehicleId}")
    public ResponseEntity<String> deleteVehicle(@PathVariable int vehicleId,
                                                @AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

        String result = vehicleService.deleteVehicle(vehicleId, userOpt.get());
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/vehicle-types")
    public ResponseEntity<VehicleType[]> getVehicleTypes() {
        return ResponseEntity.ok(VehicleType.values());
    }

    @GetMapping("/vehicle-type/{type}")
    public ResponseEntity<List<Policy>> getPoliciesByVehicleType(@PathVariable VehicleType type) {
        List<Policy> policies = policyService.getActivePoliciesByVehicleType(type);
        return ResponseEntity.ok(policies);
    }
}
