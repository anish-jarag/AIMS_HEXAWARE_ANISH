package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.Policy;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.Role;
import com.hexaware.AIMS.service.PolicyService;
import com.hexaware.AIMS.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/policy")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<String> addPolicy(@RequestBody Policy policy,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        // if (!isOfficer(userDetails)) return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(policyService.addPolicy(policy));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Policy>> getAllPolicies() {
        return ResponseEntity.ok(policyService.getAllPolicies());
    }

    @PutMapping("/update/{policyId}")
    public ResponseEntity<String> updatePolicy(@PathVariable int policyId,
                                               @RequestBody Policy updatedPolicy,
                                               @AuthenticationPrincipal UserDetails userDetails) {
        // if (!isOfficer(userDetails)) return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(policyService.updatePolicy(policyId, updatedPolicy));
    }

    @DeleteMapping("/delete/{policyId}")
    public ResponseEntity<String> deletePolicy(@PathVariable int policyId,
                                               @AuthenticationPrincipal UserDetails userDetails) {
        // if (!isOfficer(userDetails)) return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(policyService.deletePolicy(policyId));
    }

    // Utility to check officer access
    private boolean isOfficer(UserDetails userDetails) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        return userOpt.isPresent() && userOpt.get().getRole() == Role.OFFICER;
    }
}
