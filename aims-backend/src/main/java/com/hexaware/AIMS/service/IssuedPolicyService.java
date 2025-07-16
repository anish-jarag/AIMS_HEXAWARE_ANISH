package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.ProposalStatus;
import com.hexaware.AIMS.repository.IssuedPolicyRepository;
import com.hexaware.AIMS.repository.ProposalRepository;
import com.hexaware.AIMS.repository.UserRepository;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.*;
import java.util.List;

@Service
public class IssuedPolicyService {

    @Autowired
    private IssuedPolicyRepository issuedPolicyRepo;

    @Autowired
    private ProposalRepository proposalRepo;

    @Autowired
    private UserRepository userRepo;

    // Issue a policy based on approved proposal
    public String issuePolicy(int proposalId) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        if (proposalOpt.isEmpty()) return "Proposal not found";

        Proposal proposal = proposalOpt.get();
        if (proposal.getStatus() != ProposalStatus.APPROVED) {
            return "Only approved proposals can be issued";
        }

        IssuedPolicy issued = new IssuedPolicy();
        issued.setProposal(proposal);
        issued.setUser(proposal.getUser());
        issued.setPolicy(proposal.getPolicy());
        issued.setStartDate(LocalDate.now());
        issued.setEndDate(LocalDate.now().plusYears(1));
        issued.setPolicyDocumentPath("default.pdf"); // Placeholder
        double basePremium = proposal.getPolicy().getBasePremium();
        double coverageAmount = basePremium * 10;
        issued.setCoverageAmount(coverageAmount);
        issuedPolicyRepo.save(issued);
        return "Policy issued successfully";
    }

    // Get issued policy by ID
    public IssuedPolicy getIssuedPolicyById(int issuedPolicyId) {
        return issuedPolicyRepo.findById(issuedPolicyId).orElse(null);
    }

    // Get all issued policies by user
    public List<IssuedPolicy> getIssuedPoliciesByUser(int userId) {
        return userRepo.findById(userId)
                .map(issuedPolicyRepo::findByUser)
                .orElse(Collections.emptyList());
    }

    // Get all issued policies
    public List<IssuedPolicy> getAllIssuedPolicies() {
        return issuedPolicyRepo.findAll();
    }

    // Generate PDF document for issued policy
    public byte[] generatePolicyPdf(IssuedPolicy policy) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document doc = new Document();
            PdfWriter.getInstance(doc, out);
            doc.open();

            Font header = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
            Font normal = FontFactory.getFont(FontFactory.HELVETICA, 12);

            doc.add(new Paragraph("Vehicle Insurance Policy", header));
            doc.add(new Paragraph("Issued by HexaShield", normal));
            doc.add(Chunk.NEWLINE);

            doc.add(new Paragraph("Policy No: " + policy.getIssuedPolicyId(), normal));
            doc.add(new Paragraph("User: " + policy.getUser().getFullName(), normal));
            doc.add(new Paragraph("Email: " + policy.getUser().getEmail(), normal));
            doc.add(new Paragraph("Coverage Amount: ₹" + policy.getCoverageAmount(), normal));
            doc.add(new Paragraph("Valid From: " + policy.getStartDate(), normal));
            doc.add(new Paragraph("Valid To: " + policy.getEndDate(), normal));
            doc.add(new Paragraph("Policy Type: " + policy.getPolicy().getPolicyName(), normal));
            doc.add(new Paragraph("Vehicle: " +
                policy.getProposal().getVehicle().getRegistrationNumber() +
                " (" + policy.getProposal().getVehicle().getVehicleType() + ")", normal));

            doc.add(Chunk.NEWLINE);
            doc.add(new Paragraph("Thank you for choosing HexaShield.", normal));

            doc.close();
            return out.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
