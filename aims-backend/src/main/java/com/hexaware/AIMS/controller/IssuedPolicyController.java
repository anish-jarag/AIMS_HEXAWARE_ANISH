package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.repository.IssuedPolicyRepository;
import com.hexaware.AIMS.repository.ProposalRepository;
import com.hexaware.AIMS.service.IssuedPolicyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/issued")
public class IssuedPolicyController {

    @Autowired
    private IssuedPolicyService issuedPolicyService;

    @Autowired
    private ProposalRepository proposalRepo;

    @Autowired
    private IssuedPolicyRepository issuedPolicyRepo;

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

    @GetMapping("/download/{proposalId}")
    public ResponseEntity<byte[]> downloadPolicyByProposal(@PathVariable int proposalId) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        if (proposalOpt.isEmpty()) return ResponseEntity.notFound().build();

        Optional<IssuedPolicy> policyOpt = issuedPolicyRepo.findByProposal(proposalOpt.get());
        if (policyOpt.isEmpty()) return ResponseEntity.notFound().build();

        byte[] pdfContent = issuedPolicyService.generatePolicyPdf(policyOpt.get());
        if (pdfContent == null) {
            return ResponseEntity.status(500).body(null); // or return a proper error message
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=policy_" + proposalId + ".pdf")
                .body(pdfContent);
    }

    @GetMapping("/download/issued/{issuedPolicyId}")
    public ResponseEntity<byte[]> downloadPolicyByIssuedPolicyId(@PathVariable Long issuedPolicyId) {
        Optional<IssuedPolicy> policyOpt = issuedPolicyRepo.findById(issuedPolicyId.intValue());
        if (policyOpt.isEmpty()) return ResponseEntity.notFound().build();

        byte[] pdfContent = issuedPolicyService.generatePolicyPdf(policyOpt.get());
        if (pdfContent == null) {
            return ResponseEntity.status(500).body(null);
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=policy_" + issuedPolicyId + ".pdf")
                .body(pdfContent);
    }


}
