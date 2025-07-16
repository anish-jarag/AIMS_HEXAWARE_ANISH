package com.hexaware.AIMS.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hexaware.AIMS.model.enums.VehicleType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int policyId;

    @Column(nullable = false, unique = true)
    private String policyName;

    private String description;

    @Column(nullable = false)
    private double basePremium;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType vehicleType;

    @Column(nullable = false)
    private boolean isActive = true;

    @OneToMany(mappedBy = "policy", cascade = CascadeType.ALL)
    private List<PolicyAddon> addonList = new ArrayList<>();

    // Constructors
    public Policy() {}

    public Policy(String policyName, String description, double basePremium, VehicleType vehicleType, boolean isActive) {
        this.policyName = policyName;
        this.description = description;
        this.basePremium = basePremium;
        this.vehicleType = vehicleType;
        this.isActive = isActive;
    }

    // Getters & Setters
    public int getPolicyId() {
        return policyId;
    }

    public void setPolicyId(int policyId) {
        this.policyId = policyId;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getBasePremium() {
        return basePremium;
    }

    public void setBasePremium(double basePremium) {
        this.basePremium = basePremium;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public List<PolicyAddon> getAddonList() {
        return addonList;
    }

    public void setAddonList(List<PolicyAddon> addonList) {
        this.addonList = addonList;
    }
}
