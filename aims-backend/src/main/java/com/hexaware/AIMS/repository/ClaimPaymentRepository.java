package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Claim;
import com.hexaware.AIMS.model.ClaimPayment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaimPaymentRepository extends JpaRepository<ClaimPayment, Integer> {
    List<ClaimPayment> findByClaim(Claim claim);
}
