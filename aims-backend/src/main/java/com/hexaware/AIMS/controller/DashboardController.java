package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.dto.OfficerDashboardSummary;
import com.hexaware.AIMS.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/officer-summary")
    public OfficerDashboardSummary getOfficerDashboardSummary() {
        return dashboardService.getOfficerSummary();
    }
}
