package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.ProposalAddon;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalAddonRepository extends JpaRepository<ProposalAddon, Integer> {
    List<ProposalAddon> findByProposal(Proposal proposal);
}
