package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.Claim;
import com.hexaware.AIMS.model.ClaimPayment;
import com.hexaware.AIMS.model.enums.ClaimPaymentStatus;
import com.hexaware.AIMS.repository.ClaimPaymentRepository;
import com.hexaware.AIMS.repository.ClaimRepository;
import com.hexaware.AIMS.service.ClaimPaymentService;
import com.hexaware.AIMS.service.ClaimService;
import com.hexaware.AIMS.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/claim-payments")
@CrossOrigin(origins = "*")
public class ClaimPaymentController {

    @Autowired
    private ClaimPaymentService claimPaymentService;

    @Autowired
    private ClaimService claimService;

    @Autowired
    private ClaimPaymentRepository claimPaymentRepository;

    @Autowired
    private EmailService emailService;

    // Used for React: Release Payment and Send Email
    @PostMapping("/pay")
    public ResponseEntity<String> releasePayment(
        @RequestParam int claimId,
        @RequestParam Double amount,
        @RequestParam ClaimPaymentStatus status
    ) {
        Claim claim = claimService.getClaimById(claimId);
        if (claim == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Claim not found");
        }

        // Create and save ClaimPayment
        ClaimPayment payment = new ClaimPayment();
        payment.setClaim(claim);
        payment.setClaimAmountPaid(amount);
        payment.setClaimPaymentStatus(status);
        payment.setClaimPaymentDate(LocalDateTime.now());

        claimPaymentRepository.save(payment);

        // Send email to user
        String to = claim.getSubmittedBy().getEmail();
        String subject = "Claim Payment Released";
        String body = "Dear " + claim.getSubmittedBy().getFullName() +
            ",\n\nYour claim has been settled successfully. Amount Paid: ₹" + amount +
            "\n\nRegards,\nAIMS Team";

        emailService.sendSimpleEmail(to, subject, body);

        return ResponseEntity.ok("Payment released and email sent.");
    }

    @GetMapping("/{id}")
    public ClaimPayment getById(@PathVariable int id) {
        return claimPaymentService.getById(id);
    }

    @GetMapping("/claim/{claimId}")
    public List<ClaimPayment> getByClaim(@PathVariable int claimId) {
        return claimPaymentService.getByClaim(claimId);
    }

    @GetMapping("/all")
    public List<ClaimPayment> getAll() {
        return claimPaymentService.getAllClaimPayments();
    }
}
