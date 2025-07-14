package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.service.IssuedPolicyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issued")
public class IssuedPolicyController {

    @Autowired
    private IssuedPolicyService issuedPolicyService;

    // Issue policy for an approved proposal
    @PostMapping("/issue/{proposalId}")
    public String issuePolicy(@PathVariable int proposalId) {
        return issuedPolicyService.issuePolicy(proposalId);
    }

    // Get issued policy by ID
    @GetMapping("/{id}")
    public IssuedPolicy getById(@PathVariable int id) {
        return issuedPolicyService.getIssuedPolicyById(id);
    }

    // Get all issued policies for a user
    @GetMapping("/user/{userId}")
    public List<IssuedPolicy> getByUser(@PathVariable int userId) {
        return issuedPolicyService.getIssuedPoliciesByUser(userId);
    }

    // Get all issued policies 
    @GetMapping("/all")
    public List<IssuedPolicy> getAllIssuedPolicies() {
        return issuedPolicyService.getAllIssuedPolicies();
    }
}
