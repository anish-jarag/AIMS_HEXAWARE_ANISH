package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.ProposalDocument;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalDocumentRepository extends JpaRepository<ProposalDocument, Integer> {
    List<ProposalDocument> findByProposal(Proposal proposal);
}
