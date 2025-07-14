package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Claim;
import com.hexaware.AIMS.model.ClaimDocument;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClaimDocumentRepository extends JpaRepository<ClaimDocument, Integer> {
    List<ClaimDocument> findByClaim(Claim claim);
}
