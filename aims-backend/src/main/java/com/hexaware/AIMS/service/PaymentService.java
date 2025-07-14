package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.Payment;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.enums.PaymentMode;
import com.hexaware.AIMS.model.enums.PaymentStatus;
import com.hexaware.AIMS.repository.PaymentRepository;
import com.hexaware.AIMS.repository.ProposalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private ProposalRepository proposalRepo;

    // Create a new payment for a proposal
    public String makePayment(int proposalId, double amount, PaymentMode mode, String transactionRef) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        if (!proposalOpt.isPresent()) return "Proposal not found";

        Proposal proposal = proposalOpt.get();

        Optional<Payment> existing = paymentRepo.findByProposal(proposal);
        if (existing.isPresent()) return "Payment already exists for this proposal";

        Payment payment = new Payment();
        payment.setProposal(proposal);
        payment.setAmountPaid(amount);
        payment.setMode(mode);
        payment.setStatus(PaymentStatus.SUCCESS); 
        payment.setPaymentDate(LocalDateTime.now());

        paymentRepo.save(payment);
        return "Payment recorded successfully";
    }

    // Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    // Get payment by proposal
    public Payment getPaymentByProposal(int proposalId) {
        return proposalRepo.findById(proposalId)
                .flatMap(paymentRepo::findByProposal)
                .orElse(null);
    }

    // Get all payments by status
    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepo.findByStatus(status);
    }
}
