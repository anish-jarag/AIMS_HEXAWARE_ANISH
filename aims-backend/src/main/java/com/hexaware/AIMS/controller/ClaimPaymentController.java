package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.ClaimPayment;
import com.hexaware.AIMS.model.enums.ClaimPaymentStatus;
import com.hexaware.AIMS.service.ClaimPaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claim-payments")
@CrossOrigin(origins = "*")
public class ClaimPaymentController {

    @Autowired
    private ClaimPaymentService claimPaymentService;

    @PostMapping("/pay")
    public String payClaim(
            @RequestParam int claimId,
            @RequestParam double amount,
            @RequestParam ClaimPaymentStatus status) {
        return claimPaymentService.payClaim(claimId, amount, status);
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
