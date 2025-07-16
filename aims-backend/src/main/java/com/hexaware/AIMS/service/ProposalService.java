package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.*;
import com.hexaware.AIMS.model.enums.ProposalStatus;
import com.hexaware.AIMS.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProposalService {

    @Autowired private ProposalRepository proposalRepository;

    @Autowired private VehicleRepository vehicleRepository;

    @Autowired private PolicyRepository policyRepository;

    @Autowired private EmailService emailService;

    @Autowired private QuoteService quoteService;

    @Autowired PolicyAddonRepository policyAddonRepository;

   public String submitProposal(User user, int vehicleId, int policyId, List<Integer> addonIds) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElse(null);
        Policy policy = policyRepository.findById(policyId).orElse(null);

        if (vehicle == null) return "Vehicle not found.";
        if (policy == null) return "Policy not found.";
        if (!vehicle.getOwner().equals(user)) return "Unauthorized vehicle access.";

        List<Proposal> existingProposals = proposalRepository.findByUser(user);
        boolean duplicateExists = existingProposals.stream()
            .anyMatch(p ->
                p.getVehicle().getVehicleId() == vehicleId &&
                (p.getStatus() == ProposalStatus.SUBMITTED ||
                p.getStatus() == ProposalStatus.QUOTE_GENERATED ||
                p.getStatus() == ProposalStatus.PAYMENT_PENDING ||
                p.getStatus() == ProposalStatus.APPROVED)
            );

        if (duplicateExists) {
            throw new IllegalArgumentException("A proposal is already in process for this vehicle.");
        }

        Proposal proposal = new Proposal();
        proposal.setUser(user);
        proposal.setVehicle(vehicle);
        proposal.setPolicy(policy);
        proposal.setStatus(ProposalStatus.SUBMITTED);
        proposal.setSubmissionDate(LocalDate.now());

        List<ProposalAddon> proposalAddons = new ArrayList<>();
        if (addonIds != null && !addonIds.isEmpty()) {
            List<PolicyAddon> selectedAddons = policyAddonRepository.findAllById(addonIds);
            for (PolicyAddon addon : selectedAddons) {
                ProposalAddon pa = new ProposalAddon();
                pa.setProposal(proposal);
                pa.setAddon(addon);
                proposalAddons.add(pa);
            }
            proposal.setSelectedAddons(proposalAddons);
        }

        proposalRepository.save(proposal);
        return "Proposal submitted successfully.";
    }



    public List<Proposal> getProposalsByUser(User user) {
        return proposalRepository.findByUser(user);
    }

    public Optional<Proposal> getProposalById(int id) {
        return proposalRepository.findById(id);
    }

    public List<Proposal> getAllSubmittedProposals() {
        return proposalRepository.findByStatus(ProposalStatus.SUBMITTED);
    }

    public String approveProposal(int proposalId, User officer) {
        Optional<Proposal> optional = proposalRepository.findById(proposalId);
        if (optional.isEmpty()) return "Proposal not found";

        Proposal proposal = optional.get();
        proposal.setStatus(ProposalStatus.QUOTE_GENERATED); 
        proposal.setApprovedBy(officer);
        proposalRepository.save(proposal);

        quoteService.generateQuote(proposalId);

        String emailBody = "Your proposal is approved. A quote has been generated. Please log in to view details and make the payment.";
        emailService.sendSimpleEmail(proposal.getUser().getEmail(), "Proposal Approved - Quote Generated", emailBody);

        return "Proposal approved and quote generated.";
    }

    public String rejectProposal(int proposalId, User officer) {
        Optional<Proposal> optional = proposalRepository.findById(proposalId);
        if (optional.isEmpty()) return "Proposal not found";

        Proposal proposal = optional.get();
        proposal.setStatus(ProposalStatus.REJECTED);
        proposal.setApprovedBy(officer);
        proposalRepository.save(proposal);

        return "Proposal rejected successfully.";
    }

}
