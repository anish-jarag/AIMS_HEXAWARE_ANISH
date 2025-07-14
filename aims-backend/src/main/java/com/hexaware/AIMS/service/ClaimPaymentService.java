package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.Claim;
import com.hexaware.AIMS.model.ClaimPayment;
import com.hexaware.AIMS.model.enums.ClaimPaymentStatus;
import com.hexaware.AIMS.repository.ClaimPaymentRepository;
import com.hexaware.AIMS.repository.ClaimRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ClaimPaymentService {

    @Autowired
    private ClaimPaymentRepository claimPaymentRepo;

    @Autowired
    private ClaimRepository claimRepo;

    // Make a claim payment
    public String payClaim(int claimId, double amount, ClaimPaymentStatus status) {
        Optional<Claim> claimOpt = claimRepo.findById(claimId);
        if (!claimOpt.isPresent()) return "Claim not found";

        Claim claim = claimOpt.get();

        ClaimPayment payment = new ClaimPayment();
        payment.setClaim(claim);
        payment.setClaimAmountPaid(amount);
        payment.setClaimPaymentDate(LocalDateTime.now());
        payment.setClaimPaymentStatus(status);

        claimPaymentRepo.save(payment);
        return "Claim payment recorded successfully";
    }

    public List<ClaimPayment> getByClaim(int claimId) {
        return claimRepo.findById(claimId)
                .map(claimPaymentRepo::findByClaim)
                .orElse(Collections.emptyList());
    }

    public List<ClaimPayment> getAllClaimPayments() {
        return claimPaymentRepo.findAll();
    }

    public ClaimPayment getById(int id) {
        return claimPaymentRepo.findById(id).orElse(null);
    }
}
