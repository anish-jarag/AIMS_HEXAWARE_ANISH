package com.hexaware.AIMS.repository;

import com.hexaware.AIMS.model.Policy;
import com.hexaware.AIMS.model.PolicyAddon;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PolicyAddonRepository extends JpaRepository<PolicyAddon, Integer> {
    List<PolicyAddon> findByPolicy(Policy policy);
}
