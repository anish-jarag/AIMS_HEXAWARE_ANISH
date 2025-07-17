package com.hexaware.AIMS.service;

import com.hexaware.AIMS.dto.OfficerDashboardSummary;
import com.hexaware.AIMS.model.enums.ProposalStatus;
import com.hexaware.AIMS.model.enums.ClaimStatus;
import com.hexaware.AIMS.repository.ProposalRepository;
import com.hexaware.AIMS.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private ClaimRepository claimRepository;

    public OfficerDashboardSummary getOfficerSummary() {
        int totalProposals = (int) proposalRepository.count();
        int pendingProposals = proposalRepository.countByStatus(ProposalStatus.SUBMITTED);
        int approvedProposals = proposalRepository.countByStatus(ProposalStatus.APPROVED);

        int totalClaims = (int) claimRepository.count();
        int approvedClaims = claimRepository.countByStatus(ClaimStatus.APPROVED);
        int rejectedClaims = claimRepository.countByStatus(ClaimStatus.REJECTED);

        return new OfficerDashboardSummary(
            totalProposals,
            pendingProposals,
            approvedProposals,
            totalClaims,
            approvedClaims,
            rejectedClaims
        );
    }
}
