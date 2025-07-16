package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.model.Payment;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.Quote;
import com.hexaware.AIMS.model.enums.PaymentMode;
import com.hexaware.AIMS.model.enums.PaymentStatus;
import com.hexaware.AIMS.model.enums.ProposalStatus;
import com.hexaware.AIMS.repository.IssuedPolicyRepository;
import com.hexaware.AIMS.repository.PaymentRepository;
import com.hexaware.AIMS.repository.ProposalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PaymentService {

    @Autowired private PaymentRepository paymentRepo;

    @Autowired private ProposalRepository proposalRepo;

    @Autowired private IssuedPolicyRepository issuedPolicyRepository;

    @Autowired private EmailService emailService;

    @Autowired private QuoteService quoteService;

    @Autowired private IssuedPolicyService issuedPolicyService;

    // Create a new payment for a proposal
    public String makePayment(int proposalId, double amount, PaymentMode mode, String transactionRef) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        if (proposalOpt.isEmpty()) return "Proposal not found";

        Proposal proposal = proposalOpt.get();

        // Only allow payment if quote has been generated
        if (proposal.getStatus() != ProposalStatus.QUOTE_GENERATED) {
            return "Proposal is not ready for payment (quote not generated)";
        }

        // Prevent duplicate payment
        if (paymentRepo.findByProposal(proposal).isPresent()) {
            return "Payment already exists for this proposal";
        }

        // Fetch the quote
        Quote quote = quoteService.getQuoteByProposalId(proposalId);
        if (quote == null) return "Quote not found for proposal";

        if (amount != quote.getTotalPremium()) {
            return "Invalid payment amount. Please pay exactly ₹" + quote.getTotalPremium();
        }

        // Generate Issued Policy
        IssuedPolicy policy = new IssuedPolicy();
        policy.setProposal(proposal);
        policy.setUser(proposal.getUser());
        policy.setPolicy(proposal.getPolicy());
        policy.setStartDate(LocalDate.now());
        policy.setEndDate(LocalDate.now().plusYears(1));
        policy.setCoverageAmount(quote.getTotalPremium()); 

        issuedPolicyRepository.save(policy);

        // Update proposal status to ACTIVE
        proposal.setStatus(ProposalStatus.ACTIVE);
        proposalRepo.save(proposal);

        // Save Payment
        Payment payment = new Payment(proposal, amount, mode, PaymentStatus.SUCCESS, LocalDateTime.now(), transactionRef);
        paymentRepo.save(payment);

        // Send confirmation email
        byte[] pdf = issuedPolicyService.generatePolicyPdf(policy);
        emailService.sendPaymentConfirmationWithPdf(proposal.getUser().getEmail(), policy, pdf);
        return "Payment successful. Policy issued.";
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
