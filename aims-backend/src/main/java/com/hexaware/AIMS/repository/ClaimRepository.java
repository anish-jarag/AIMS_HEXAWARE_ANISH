package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Claim;
import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.ClaimStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaimRepository extends JpaRepository<Claim, Integer> {
    List<Claim> findBySubmittedBy(User user);
    List<Claim> findByStatus(ClaimStatus status);
    List<Claim> findByIssuedPolicy(IssuedPolicy issuedPolicy);
    int countByStatus(ClaimStatus status);

}
