package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IssuedPolicyRepository extends JpaRepository<IssuedPolicy, Integer> {
    List<IssuedPolicy> findByUser(User user);
    Optional<IssuedPolicy> findByProposal(Proposal proposal);
    Optional<IssuedPolicy> findById(int issuedPolicyId);

}
