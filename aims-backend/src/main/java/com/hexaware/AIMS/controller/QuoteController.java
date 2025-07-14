package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.Quote;
import com.hexaware.AIMS.service.QuoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    @Autowired
    private QuoteService quoteService;

    @PostMapping("/generate/{proposalId}")
    public String generateQuote(@PathVariable int proposalId) {
        return quoteService.generateQuote(proposalId);
    }

    @GetMapping("/proposal/{proposalId}")
    public Quote getQuoteByProposal(@PathVariable int proposalId) {
        return quoteService.getQuoteByProposalId(proposalId);
    }

    @GetMapping("/{quoteId}")
    public Quote getQuoteById(@PathVariable long quoteId) {
        return quoteService.getQuoteById(quoteId);
    }
}
