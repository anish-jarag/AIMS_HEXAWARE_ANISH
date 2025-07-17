package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Policy;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.ProposalStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProposalRepository extends JpaRepository<Proposal, Integer> {
    List<Proposal> findByUser(User user);
    List<Proposal> findByStatus(ProposalStatus status);
    List<Proposal> findByPolicy(Policy policy);
    List<Proposal> findByUser_UserIdOrderByProposalIdDesc(int userId);
    List<Proposal> findByStatusIn(List<ProposalStatus> of);
    int countByStatus(ProposalStatus status);

}
