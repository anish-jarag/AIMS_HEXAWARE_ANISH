package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    Optional<Quote> findByProposal(Proposal proposal);
}
