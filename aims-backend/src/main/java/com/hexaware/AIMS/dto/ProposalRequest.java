package com.hexaware.AIMS.dto;

import java.util.List;

public class ProposalRequest {
    private int vehicleId;
    private int policyId;
    private List<Integer> addonIds;

    // Getters and Setters
    public int getVehicleId() { return vehicleId; }
    public void setVehicleId(int vehicleId) { this.vehicleId = vehicleId; }

    public int getPolicyId() { return policyId; }
    public void setPolicyId(int policyId) { this.policyId = policyId; }

    public List<Integer> getAddonIds() { return addonIds; }
    public void setAddonIds(List<Integer> addonIds) { this.addonIds = addonIds; }
}
