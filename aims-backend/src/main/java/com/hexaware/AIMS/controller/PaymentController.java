package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.Payment;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.PaymentMode;
import com.hexaware.AIMS.model.enums.PaymentStatus;
import com.hexaware.AIMS.repository.PaymentRepository;
import com.hexaware.AIMS.repository.UserRepository;
import com.hexaware.AIMS.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

     @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private UserRepository userRepo;

    // Record a payment for a proposal
    @PostMapping("/pay")
    public String makePayment(
            @RequestParam int proposalId,
            @RequestParam double amount,
            @RequestParam PaymentMode mode,
            @RequestParam String transactionRef) {
        return paymentService.makePayment(proposalId, amount, mode, transactionRef);
    }

    // Get payment for a specific proposal
    @GetMapping("/proposal/{proposalId}")
    public Payment getByProposal(@PathVariable int proposalId) {
        return paymentService.getPaymentByProposal(proposalId);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Payment>> getPaymentsByUser(@PathVariable int userId) {
        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();

        List<Payment> payments = paymentRepo.findByUser(userOpt.get());
        return ResponseEntity.ok(payments);
    }

    // Get all payments
    @GetMapping("/all")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Get payments by status (e.g., SUCCESS, PENDING, FAILED)
    @GetMapping("/status/{status}")
    public List<Payment> getByStatus(@PathVariable PaymentStatus status) {
        return paymentService.getPaymentsByStatus(status);
    }
}
