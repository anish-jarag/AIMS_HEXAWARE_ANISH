package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.PolicyAddon;
import com.hexaware.AIMS.service.PolicyAddonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policy-addons")
public class PolicyAddonController {

    @Autowired
    private PolicyAddonService addonService;

    // Add new addon to a policy
    @PostMapping("/add/{policyId}")
    public ResponseEntity<String> addAddon(@PathVariable int policyId, @RequestBody PolicyAddon addon) {
        String result = addonService.addAddon(policyId, addon);
        return ResponseEntity.ok(result);
    }

    // Update existing addon
    @PutMapping("/update/{addonId}")
    public ResponseEntity<String> updateAddon(@PathVariable int addonId, @RequestBody PolicyAddon updatedAddon) {
        String result = addonService.updateAddon(addonId, updatedAddon);
        return ResponseEntity.ok(result);
    }

    // Delete addon
    @DeleteMapping("/delete/{addonId}")
    public ResponseEntity<String> deleteAddon(@PathVariable int addonId) {
        String result = addonService.deleteAddon(addonId);
        return ResponseEntity.ok(result);
    }

    // Get all addons for a policy
    @GetMapping("/policy/{policyId}")
    public ResponseEntity<List<PolicyAddon>> getAddonsByPolicy(@PathVariable int policyId) {
        List<PolicyAddon> addons = addonService.getAddonsByPolicy(policyId);
        return ResponseEntity.ok(addons);
    }

    // Get all addons 
    @GetMapping("/all")
    public ResponseEntity<List<PolicyAddon>> getAllAddons() {
        return ResponseEntity.ok(addonService.getAllAddons());
    }
}
