package com.hexaware.AIMS.model;

import jakarta.persistence.*;

@Entity
public class ProposalAddon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int proposalAddonId;

    @ManyToOne(optional = false)
    private Proposal proposal;

    @ManyToOne(optional = false)
    private PolicyAddon addon;

    // Constructors
    public ProposalAddon() {}

    public ProposalAddon(Proposal proposal, PolicyAddon addon) {
        this.proposal = proposal;
        this.addon = addon;
    }

    // Getters & Setters
    public int getProposalAddonId() { return proposalAddonId; }
    public void setProposalAddonId(int proposalAddonId) { this.proposalAddonId = proposalAddonId; }

    public Proposal getProposal() { return proposal; }
    public void setProposal(Proposal proposal) { this.proposal = proposal; }

    public PolicyAddon getAddon() { return addon; }
    public void setAddon(PolicyAddon addon) { this.addon = addon; }
}
