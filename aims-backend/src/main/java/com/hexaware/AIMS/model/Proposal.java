package com.hexaware.AIMS.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hexaware.AIMS.model.enums.ProposalStatus;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Proposal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int proposalId;

    @ManyToOne(optional = false)
    private User user;

    @OneToOne(optional = false)
    private Vehicle vehicle;

    @ManyToOne(optional = false)
    private Policy policy;

    @OneToMany(mappedBy = "proposal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProposalAddon> selectedAddons = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private ProposalStatus status;

    private LocalDate submissionDate;

    @ManyToOne
    private User approvedBy; 

    // Constructors
    public Proposal() {}

    public Proposal(User user, Vehicle vehicle, Policy policy, ProposalStatus status, LocalDate submissionDate, User approvedBy) {
        this.user = user;
        this.vehicle = vehicle;
        this.policy = policy;
        this.status = status;
        this.submissionDate = submissionDate;
        this.approvedBy = approvedBy;
    }

    // Getters & Setters
    public int getProposalId() { return proposalId; }
    public void setProposalId(int proposalId) { this.proposalId = proposalId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }

    public Policy getPolicy() { return policy; }
    public void setPolicy(Policy policy) { this.policy = policy; }

    public List<ProposalAddon> getSelectedAddons() { return selectedAddons;}

    public void setSelectedAddons(List<ProposalAddon> selectedAddons) { this.selectedAddons = selectedAddons; }

    public ProposalStatus getStatus() { return status; }
    public void setStatus(ProposalStatus status) { this.status = status; }

    public LocalDate getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(LocalDate submissionDate) { this.submissionDate = submissionDate; }

    public User getApprovedBy() { return approvedBy; }
    public void setApprovedBy(User approvedBy) { this.approvedBy = approvedBy; }
}
