package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Payment;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.PaymentStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByStatus(PaymentStatus status);
    Optional<Payment> findByProposal(Proposal proposal);
    
    @Query("SELECT p FROM Payment p WHERE p.proposal.user = :user")
    List<Payment> findByUser(@Param("user") User user);
}
