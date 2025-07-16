package com.hexaware.AIMS.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.AIMS.model.Policy;
import com.hexaware.AIMS.repository.ClaimRepository;
import com.hexaware.AIMS.repository.IssuedPolicyRepository;
import com.hexaware.AIMS.repository.PolicyRepository;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*") 
public class HomeController {

    @Autowired
    private IssuedPolicyRepository issuedPolicyRepo;

    @Autowired
    private ClaimRepository claimRepo;

    @Autowired
    private PolicyRepository policyRepo;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("policies", issuedPolicyRepo.count());
        stats.put("claims", claimRepo.count());
        stats.put("satisfaction", 93); 
        return stats;
    }

    @GetMapping("/policies")
    public List<Policy> getAllActivePolicies() {
        return policyRepo.findByIsActiveTrue(); 
    }
}
