package com.hexaware.AIMS.dto;


public class OfficerDashboardSummary {
    private int totalProposals;
    private int pendingProposals;
    private int approvedProposals;
    private int totalClaims;
    private int approvedClaims;
    private int rejectedClaims;
    public int getTotalProposals() {
        return totalProposals;
    }
    public void setTotalProposals(int totalProposals) {
        this.totalProposals = totalProposals;
    }
    public int getPendingProposals() {
        return pendingProposals;
    }
    public void setPendingProposals(int pendingProposals) {
        this.pendingProposals = pendingProposals;
    }
    public int getApprovedProposals() {
        return approvedProposals;
    }
    public void setApprovedProposals(int approvedProposals) {
        this.approvedProposals = approvedProposals;
    }
    public int getTotalClaims() {
        return totalClaims;
    }
    public void setTotalClaims(int totalClaims) {
        this.totalClaims = totalClaims;
    }
    public int getApprovedClaims() {
        return approvedClaims;
    }
    public void setApprovedClaims(int approvedClaims) {
        this.approvedClaims = approvedClaims;
    }
    public int getRejectedClaims() {
        return rejectedClaims;
    }
    public void setRejectedClaims(int rejectedClaims) {
        this.rejectedClaims = rejectedClaims;
    }
    @Override
    public String toString() {
        return "OfficerDashboardSummary [totalProposals=" + totalProposals + ", pendingProposals=" + pendingProposals
                + ", approvedProposals=" + approvedProposals + ", totalClaims=" + totalClaims + ", approvedClaims="
                + approvedClaims + ", rejectedClaims=" + rejectedClaims + "]";
    }
    public OfficerDashboardSummary(int totalProposals, int pendingProposals, int approvedProposals, int totalClaims,
            int approvedClaims, int rejectedClaims) {
        this.totalProposals = totalProposals;
        this.pendingProposals = pendingProposals;
        this.approvedProposals = approvedProposals;
        this.totalClaims = totalClaims;
        this.approvedClaims = approvedClaims;
        this.rejectedClaims = rejectedClaims;
    }


    
}
