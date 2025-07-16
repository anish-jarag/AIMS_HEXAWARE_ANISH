package com.hexaware.AIMS.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "quotes")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quoteId;

    @OneToOne
    @JoinColumn(name = "proposal_id", nullable = false, unique = true)
    private Proposal proposal;

    private double basePremium;
    private double addonCharges;
    private double totalPremium;

    private LocalDate generatedDate = LocalDate.now();

    public Quote() {}

    public Quote(Proposal proposal, double basePremium, double addonCharges) {
        this.proposal = proposal;
        this.basePremium = basePremium;
        this.addonCharges = addonCharges;
        this.totalPremium = basePremium + addonCharges;
        this.generatedDate = LocalDate.now();
    }

    public Long getQuoteId() {
        return quoteId;
    }

    public Proposal getProposal() {
        return proposal;
    }

    public void setProposal(Proposal proposal) {
        this.proposal = proposal;
    }

    public double getBasePremium() {
        return basePremium;
    }

    public void setBasePremium(double basePremium) {
        this.basePremium = basePremium;
    }

    public double getAddonCharges() {
        return addonCharges;
    }

    public void setAddonCharges(double addonCharges) {
        this.addonCharges = addonCharges;
    }

    public double getTotalPremium() {
        return totalPremium;
    }

    public void setTotalPremium(double totalPremium) {
        this.totalPremium = totalPremium;
    }

    public LocalDate getGeneratedDate() {
        return generatedDate;
    }

    public void setGeneratedDate(LocalDate generatedDate) {
        this.generatedDate = generatedDate;
    }
}
