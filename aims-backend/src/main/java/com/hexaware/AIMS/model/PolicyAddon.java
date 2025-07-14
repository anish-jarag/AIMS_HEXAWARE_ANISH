package com.hexaware.AIMS.model;

import jakarta.persistence.*;

@Entity
public class PolicyAddon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int addonId;

    @Column(nullable = false)
    private String addonName;

    private String description;

    @Column(nullable = false)
    private double additionalCost;

    @ManyToOne
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

    // Constructors
    public PolicyAddon() {}

    public PolicyAddon(String addonName, String description, double additionalCost, Policy policy) {
        this.addonName = addonName;
        this.description = description;
        this.additionalCost = additionalCost;
        this.policy = policy;
    }

    // Getters & Setters
    public int getAddonId() { return addonId; }
    public void setAddonId(int addonId) { this.addonId = addonId; }

    public String getAddonName() { return addonName; }
    public void setAddonName(String addonName) { this.addonName = addonName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAdditionalCost() { return additionalCost; }
    public void setAdditionalCost(double additionalCost) { this.additionalCost = additionalCost; }

    public Policy getPolicy() { return policy; }
    public void setPolicy(Policy policy) { this.policy = policy; }
}
