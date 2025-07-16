package com.hexaware.AIMS.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hexaware.AIMS.model.enums.ClaimPaymentStatus;

@Entity
@Table(name = "claim_payments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ClaimPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int claimPaymentId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "claim_id")
    private Claim claim;

    @Column(nullable = false)
    private double claimAmountPaid;

    private LocalDateTime claimPaymentDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimPaymentStatus claimPaymentStatus;

    // Constructors
    public ClaimPayment() {}

    public ClaimPayment(Claim claim, double claimAmountPaid, LocalDateTime claimPaymentDate, ClaimPaymentStatus claimPaymentStatus) {
        this.claim = claim;
        this.claimAmountPaid = claimAmountPaid;
        this.claimPaymentDate = claimPaymentDate;
        this.claimPaymentStatus = claimPaymentStatus;
    }

    // Getters & Setters
    public int getClaimPaymentId() { return claimPaymentId; }
    public void setClaimPaymentId(int claimPaymentId) { this.claimPaymentId = claimPaymentId; }

    public Claim getClaim() { return claim; }
    public void setClaim(Claim claim) { this.claim = claim; }

    public double getClaimAmountPaid() { return claimAmountPaid; }
    public void setClaimAmountPaid(double claimAmountPaid) { this.claimAmountPaid = claimAmountPaid; }

    public LocalDateTime getClaimPaymentDate() { return claimPaymentDate; }
    public void setClaimPaymentDate(LocalDateTime claimPaymentDate) { this.claimPaymentDate = claimPaymentDate; }

    public ClaimPaymentStatus getClaimPaymentStatus() { return claimPaymentStatus; }
    public void setClaimPaymentStatus(ClaimPaymentStatus claimPaymentStatus) { this.claimPaymentStatus = claimPaymentStatus; }
}
