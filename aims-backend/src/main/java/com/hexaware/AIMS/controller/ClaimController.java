package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.Claim;
import com.hexaware.AIMS.model.enums.ClaimStatus;
import com.hexaware.AIMS.service.ClaimService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitClaim(
            @RequestParam int issuedPolicyId,
            @RequestParam int userId,
            @RequestParam String reason) {
        return ResponseEntity.ok(claimService.submitClaim(issuedPolicyId, userId, reason));
    }


    @PutMapping("/decide")
    public String decideClaim(
            @RequestParam int claimId,
            @RequestParam int officerId,
            @RequestParam ClaimStatus decision,
            @RequestParam String remarks) {
        return claimService.decideClaim(claimId, officerId, decision, remarks);
    }

    @GetMapping("/{id}")
    public Claim getById(@PathVariable int id) {
        return claimService.getClaimById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Claim> getByUser(@PathVariable int userId) {
        return claimService.getClaimsByUser(userId);
    }

    @GetMapping("/policy/{policyId}")
    public List<Claim> getByPolicy(@PathVariable int policyId) {
        return claimService.getClaimsByPolicy(policyId);
    }

    @GetMapping("/status/{status}")
    public List<Claim> getByStatus(@PathVariable ClaimStatus status) {
        return claimService.getClaimsByStatus(status);
    }

    @GetMapping("/all")
    public List<Claim> getAll() {
        return claimService.getAllClaims();
    }
}
