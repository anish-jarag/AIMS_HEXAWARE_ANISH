package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Payment;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.enums.PaymentStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByStatus(PaymentStatus status);
    Optional<Payment> findByProposal(Proposal proposal);

}
