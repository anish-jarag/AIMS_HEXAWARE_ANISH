package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.Claim;
import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.ClaimStatus;
import com.hexaware.AIMS.repository.ClaimRepository;
import com.hexaware.AIMS.repository.IssuedPolicyRepository;
import com.hexaware.AIMS.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepo;

    @Autowired
    private IssuedPolicyRepository issuedPolicyRepo;

    @Autowired
    private UserRepository userRepo;

    // File a new claim
    public String submitClaim(int issuedPolicyId, int userId, String reason) {
        Optional<IssuedPolicy> policyOpt = issuedPolicyRepo.findById(issuedPolicyId);
        Optional<User> userOpt = userRepo.findById(userId);

        if (!policyOpt.isPresent()) return "Issued Policy not found";
        if (!userOpt.isPresent()) return "User not found";

        Claim claim = new Claim();
        claim.setIssuedPolicy(policyOpt.get());
        claim.setSubmittedBy(userOpt.get());
        claim.setClaimReason(reason);
        claim.setStatus(ClaimStatus.PENDING);
        claim.setSubmittedDate(LocalDate.now());

        claimRepo.save(claim);
        return "Claim submitted successfully";
    }

    // Approve or reject a claim
    public String decideClaim(int claimId, int officerId, ClaimStatus decision, String remarks) {
        Optional<Claim> claimOpt = claimRepo.findById(claimId);
        Optional<User> officerOpt = userRepo.findById(officerId);

        if (!claimOpt.isPresent()) return "Claim not found";
        if (!officerOpt.isPresent()) return "Officer not found";

        Claim claim = claimOpt.get();
        claim.setStatus(decision);
        claim.setOfficerRemarks(remarks);
        claim.setApprovedBy(officerOpt.get());
        claim.setDecisionDate(LocalDate.now());

        claimRepo.save(claim);
        return "Claim " + decision.toString().toLowerCase() + " successfully";
    }

    public List<Claim> getClaimsByUser(int userId) {
        return userRepo.findById(userId)
                .map(claimRepo::findBySubmittedBy)
                .orElse(Collections.emptyList());
    }

    public List<Claim> getClaimsByPolicy(int issuedPolicyId) {
        return issuedPolicyRepo.findById(issuedPolicyId)
                .map(claimRepo::findByIssuedPolicy)
                .orElse(Collections.emptyList());
    }

    public List<Claim> getClaimsByStatus(ClaimStatus status) {
        return claimRepo.findByStatus(status);
    }

    public List<Claim> getAllClaims() {
        return claimRepo.findAll();
    }

    public Claim getClaimById(int id) {
        return claimRepo.findById(id).orElse(null);
    }
}
