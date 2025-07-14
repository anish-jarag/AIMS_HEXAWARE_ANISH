package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.Policy;
import com.hexaware.AIMS.model.PolicyAddon;
import com.hexaware.AIMS.repository.PolicyAddonRepository;
import com.hexaware.AIMS.repository.PolicyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PolicyAddonService {

    @Autowired
    private PolicyAddonRepository addonRepo;

    @Autowired
    private PolicyRepository policyRepo;

    // Add new addon
    public String addAddon(int policyId, PolicyAddon addon) {
        Optional<Policy> policyOpt = policyRepo.findById(policyId);
        if (!policyOpt.isPresent()) return "Policy not found";

        addon.setPolicy(policyOpt.get());
        addonRepo.save(addon);
        return "Addon added successfully";
    }

    // Update existing addon
    public String updateAddon(int addonId, PolicyAddon updated) {
        Optional<PolicyAddon> existingOpt = addonRepo.findById(addonId);
        if (!existingOpt.isPresent()) return "Addon not found";

        PolicyAddon existing = existingOpt.get();
        existing.setAddonName(updated.getAddonName());
        existing.setAdditionalCost(updated.getAdditionalCost());

        addonRepo.save(existing);
        return "Addon updated successfully";
    }

    // Delete addon
    public String deleteAddon(int addonId) {
        if (!addonRepo.existsById(addonId)) return "Addon not found";
        addonRepo.deleteById(addonId);
        return "Addon deleted successfully";
    }

    // Get all addons for a policy
    public List<PolicyAddon> getAddonsByPolicy(int policyId) {
        Optional<Policy> policyOpt = policyRepo.findById(policyId);
        return policyOpt.map(addonRepo::findByPolicy).orElse(Collections.emptyList());
    }

    // (Optional) Get all addons
    public List<PolicyAddon> getAllAddons() {
        return addonRepo.findAll();
    }
}
