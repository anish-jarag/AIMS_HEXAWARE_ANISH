package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.Policy;
import com.hexaware.AIMS.model.enums.VehicleType;
import com.hexaware.AIMS.repository.PolicyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public String addPolicy(Policy policy) {
        if (policyRepository.findByVehicleType(policy.getVehicleType())
                .stream()
                .anyMatch(p -> p.getPolicyName().equalsIgnoreCase(policy.getPolicyName()))) {
            return "Policy with the same name already exists for this vehicle type.";
        }
        policyRepository.save(policy);
        return "Policy added successfully.";
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public Optional<Policy> getPolicyById(int policyId) {
        return policyRepository.findById(policyId);
    }

    public String updatePolicy(int policyId, Policy updated) {
        Optional<Policy> optionalPolicy = policyRepository.findById(policyId);
        if (optionalPolicy.isEmpty()) return "Policy not found.";

        Policy existing = optionalPolicy.get();
        existing.setPolicyName(updated.getPolicyName());
        existing.setDescription(updated.getDescription());
        existing.setBasePremium(updated.getBasePremium());
        existing.setVehicleType(updated.getVehicleType());
        existing.setActive(updated.isActive());

        policyRepository.save(existing);
        return "Policy updated successfully.";
    }

    public String deletePolicy(int policyId) {
        if (!policyRepository.existsById(policyId)) {
            return "Policy not found.";
        }
        policyRepository.deleteById(policyId);
        return "Policy deleted successfully.";
    }

    public List<Policy> getActivePoliciesByVehicleType(VehicleType type) {
    return policyRepository.findByVehicleTypeAndIsActiveTrue(type);
}
}
