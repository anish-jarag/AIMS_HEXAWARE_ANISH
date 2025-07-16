package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.dto.ProposalRequest;
import com.hexaware.AIMS.model.*;
import com.hexaware.AIMS.model.enums.Role;
import com.hexaware.AIMS.service.ProposalService;
import com.hexaware.AIMS.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/proposal")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;

    @Autowired
    private UserService userService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitProposal(@RequestBody ProposalRequest payload,
                                                @AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

        String result = proposalService.submitProposal(
            userOpt.get(),
            payload.getVehicleId(),
            payload.getPolicyId(),
            payload.getAddonIds()
        );
        return ResponseEntity.ok(result);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Proposal>> getUserProposals(@AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) return ResponseEntity.status(404).build();

        return ResponseEntity.ok(proposalService.getProposalsByUser(userOpt.get()));
    }

    @GetMapping("/{proposalId}")
    public ResponseEntity<?> getProposalById(@PathVariable int proposalId,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

        Optional<Proposal> proposalOpt = proposalService.getProposalById(proposalId);
        if (proposalOpt.isEmpty()) return ResponseEntity.status(404).body("Proposal not found");

        Proposal proposal = proposalOpt.get();
        User currentUser = userOpt.get();

        // Allow only the owner or an officer to view
        boolean isOwner = proposal.getUser().getUserId() == currentUser.getUserId();
        boolean isOfficer = currentUser.getRole() == Role.OFFICER;

        if (!isOwner && !isOfficer)
            return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(proposal);
    }


    
    @GetMapping("/all-submitted")
    public ResponseEntity<List<Proposal>> getAllSubmittedProposals(@AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> userOpt = userService.getUserByEmail(userDetails.getUsername());
        if (userOpt.isEmpty() || userOpt.get().getRole() != Role.OFFICER)
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(proposalService.getAllSubmittedProposals());
    }

    @PutMapping("/approve/{proposalId}")
    public ResponseEntity<String> approveProposal(@PathVariable int proposalId,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> officerOpt = userService.getUserByEmail(userDetails.getUsername());
        if (officerOpt.isEmpty() || officerOpt.get().getRole() != Role.OFFICER)
            return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(proposalService.approveProposal(proposalId, officerOpt.get()));
    }

    @PutMapping("/reject/{proposalId}")
    public ResponseEntity<String> rejectProposal(@PathVariable int proposalId,
                                                 @AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> officerOpt = userService.getUserByEmail(userDetails.getUsername());
        if (officerOpt.isEmpty() || officerOpt.get().getRole() != Role.OFFICER)
            return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(proposalService.rejectProposal(proposalId, officerOpt.get()));
    }

}
