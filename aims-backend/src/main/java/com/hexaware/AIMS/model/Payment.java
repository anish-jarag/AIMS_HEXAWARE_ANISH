package com.hexaware.AIMS.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hexaware.AIMS.model.enums.PaymentMode;
import com.hexaware.AIMS.model.enums.PaymentStatus;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    @OneToOne(optional = false)
    @JoinColumn(name = "proposal_id", unique = true)
    private Proposal proposal;

    @Column(nullable = false)
    private double amountPaid;

    @Enumerated(EnumType.STRING)
    private PaymentMode mode;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @Column(nullable = false)
    private LocalDateTime paymentDate = LocalDateTime.now();

    @Column(nullable = false, unique = true)
    private String transactionReference;

    // Constructors
    public Payment() {}

    public Payment(Proposal proposal, double amountPaid, PaymentMode mode, PaymentStatus status, LocalDateTime paymentDate, String transactionReference) {
        this.proposal = proposal;
        this.amountPaid = amountPaid;
        this.mode = mode;
        this.status = status;
        this.paymentDate = paymentDate;
        this.transactionReference = transactionReference;
    }

    // Getters and Setters
    public int getPaymentId() { return paymentId; }
    public void setPaymentId(int paymentId) { this.paymentId = paymentId; }

    public Proposal getProposal() { return proposal; }
    public void setProposal(Proposal proposal) { this.proposal = proposal; }

    public double getAmountPaid() { return amountPaid; }
    public void setAmountPaid(double amountPaid) { this.amountPaid = amountPaid; }

    public PaymentMode getMode() { return mode; }
    public void setMode(PaymentMode mode) { this.mode = mode; }

    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }
}
