package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.ProposalStatus;
import com.hexaware.AIMS.repository.IssuedPolicyRepository;
import com.hexaware.AIMS.repository.ProposalRepository;
import com.hexaware.AIMS.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class IssuedPolicyService {

    @Autowired
    private IssuedPolicyRepository issuedPolicyRepo;

    @Autowired
    private ProposalRepository proposalRepo;

    @Autowired
    private UserRepository userRepo;

    // Issue a policy based on approved proposal
    public String issuePolicy(int proposalId) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        if (!proposalOpt.isPresent()) return "Proposal not found";

        Proposal proposal = proposalOpt.get();
        if (proposal.getStatus() != ProposalStatus.APPROVED) {
            return "Only approved proposals can be issued";
        }

        IssuedPolicy issued = new IssuedPolicy();
        issued.setProposal(proposal);
        issued.setUser(proposal.getUser());
        issued.setPolicy(proposal.getPolicy()); 
        issued.setStartDate(LocalDate.now());
        issued.setEndDate(LocalDate.now().plusYears(1));
        issued.setPolicyDocumentPath("default.pdf"); 

        issuedPolicyRepo.save(issued);
        return "Policy issued successfully";
    }


    // Get issued policy by ID
    public IssuedPolicy getIssuedPolicyById(int issuedPolicyId) {
        return issuedPolicyRepo.findById(issuedPolicyId).orElse(null);
    }

    // Get all issued policies by user
    public List<IssuedPolicy> getIssuedPoliciesByUser(int userId) {
        Optional<User> userOpt = userRepo.findById(userId);
        if (!userOpt.isPresent()) return Collections.emptyList();

        return issuedPolicyRepo.findByUser(userOpt.get());
    }

    // (Optional) Get all issued policies
    public List<IssuedPolicy> getAllIssuedPolicies() {
        return issuedPolicyRepo.findAll();
    }
}
