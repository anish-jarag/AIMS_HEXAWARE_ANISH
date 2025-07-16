package com.hexaware.AIMS.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hexaware.AIMS.model.enums.ClaimStatus;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int claimId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "issued_policy_id")
    private IssuedPolicy issuedPolicy;

    @ManyToOne(optional = false)
    @JoinColumn(name = "submitted_by")
    private User submittedBy;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(nullable = false)
    private String claimReason;

    private String officerRemarks;

    @Column(nullable = false)
    private double claimAmountRequested;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClaimStatus status;

    private LocalDate submittedDate;
    private LocalDate decisionDate;

    // Constructors
    public Claim() {}

    public Claim(IssuedPolicy issuedPolicy, User submittedBy, String claimReason, double claimAmountRequested, ClaimStatus status, LocalDate submittedDate) {
        this.issuedPolicy = issuedPolicy;
        this.submittedBy = submittedBy;
        this.claimReason = claimReason;
        this.claimAmountRequested = claimAmountRequested;
        this.status = status;
        this.submittedDate = submittedDate;
    }

    // Getters and Setters
    public int getClaimId() { return claimId; }
    public void setClaimId(int claimId) { this.claimId = claimId; }

    public IssuedPolicy getIssuedPolicy() { return issuedPolicy; }
    public void setIssuedPolicy(IssuedPolicy issuedPolicy) { this.issuedPolicy = issuedPolicy; }

    public User getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(User submittedBy) { this.submittedBy = submittedBy; }

    public User getApprovedBy() { return approvedBy; }
    public void setApprovedBy(User approvedBy) { this.approvedBy = approvedBy; }

    public String getClaimReason() { return claimReason; }
    public void setClaimReason(String claimReason) { this.claimReason = claimReason; }

    public String getOfficerRemarks() { return officerRemarks; }
    public void setOfficerRemarks(String officerRemarks) { this.officerRemarks = officerRemarks; }

    public double getClaimAmountRequested() { return claimAmountRequested; }
    public void setClaimAmountRequested(double claimAmountRequested) { this.claimAmountRequested = claimAmountRequested; }

    public ClaimStatus getStatus() { return status; }
    public void setStatus(ClaimStatus status) { this.status = status; }

    public LocalDate getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(LocalDate submittedDate) { this.submittedDate = submittedDate; }

    public LocalDate getDecisionDate() { return decisionDate; }
    public void setDecisionDate(LocalDate decisionDate) { this.decisionDate = decisionDate; }
}
