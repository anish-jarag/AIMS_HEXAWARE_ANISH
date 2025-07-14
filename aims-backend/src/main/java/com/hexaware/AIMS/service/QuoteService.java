package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.*;
import com.hexaware.AIMS.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository quoteRepo;

    @Autowired
    private ProposalRepository proposalRepo;

    @Autowired
    private PolicyAddonRepository addonRepo;

    public String generateQuote(int proposalId) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        if (!proposalOpt.isPresent()) return "Proposal not found";

        Proposal proposal = proposalOpt.get();

        // Base premium
        double basePremium = proposal.getPolicy().getBasePremium();

        // Addon Charges
        double addonCharges = addonRepo.findByPolicy(proposal.getPolicy())
                                       .stream()
                                       .mapToDouble(PolicyAddon::getAdditionalCost)
                                       .sum();

        // Save Quote
        Quote quote = new Quote(proposal, basePremium, addonCharges);
        quoteRepo.save(quote);

        return "Quote generated successfully with total premium: ₹" + quote.getTotalPremium();
    }

    public Quote getQuoteByProposalId(int proposalId) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        if (!proposalOpt.isPresent()) return null;

        return quoteRepo.findByProposal(proposalOpt.get()).orElse(null);
    }

    public Quote getQuoteById(long quoteId) {
        return quoteRepo.findById(quoteId).orElse(null);
    }
}
