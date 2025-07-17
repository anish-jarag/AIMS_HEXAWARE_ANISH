package com.hexaware.AIMS.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "issued_policies")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class IssuedPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int issuedPolicyId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "policy_id")
    private Policy policy;

    @OneToOne(optional = false)
    @JoinColumn(name = "proposal_id", unique = true)
    private Proposal proposal;

    private double coverageAmount;

    private LocalDate startDate;

    private LocalDate endDate;

    private String policyDocumentPath; 

    // Constructors
    public IssuedPolicy() {}

    public IssuedPolicy(User user, Policy policy, Proposal proposal, double coverageAmount,LocalDate startDate, LocalDate endDate, String policyDocumentPath) {
        this.user = user;
        this.policy = policy;
        this.proposal = proposal;
        this.coverageAmount = coverageAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.policyDocumentPath = policyDocumentPath;
    }
    
    // Getters and Setters
    public int getIssuedPolicyId() { return issuedPolicyId; }
    public void setIssuedPolicyId(int issuedPolicyId) { this.issuedPolicyId = issuedPolicyId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Policy getPolicy() { return policy; }
    public void setPolicy(Policy policy) { this.policy = policy; }

    public Proposal getProposal() { return proposal; }
    public void setProposal(Proposal proposal) { this.proposal = proposal; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getPolicyDocumentPath() { return policyDocumentPath; }
    public void setPolicyDocumentPath(String policyDocumentPath) { this.policyDocumentPath = policyDocumentPath; }

    public double getCoverageAmount() { return coverageAmount; }
    public void setCoverageAmount(double coverageAmount) { this.coverageAmount = coverageAmount; }
}
