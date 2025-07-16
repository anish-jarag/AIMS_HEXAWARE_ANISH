package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.IssuedPolicy;
import com.hexaware.AIMS.model.Proposal;
import com.hexaware.AIMS.model.ProposalDocument;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.DocumentType;
import com.hexaware.AIMS.repository.IssuedPolicyRepository;
import com.hexaware.AIMS.repository.ProposalDocumentRepository;
import com.hexaware.AIMS.repository.ProposalRepository;
import com.hexaware.AIMS.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ProposalDocumentService {

    @Autowired
    private ProposalDocumentRepository docRepo;

    @Autowired
    private ProposalRepository proposalRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private IssuedPolicyRepository issuedPolicyRepo;

    // Upload a new document
    public String uploadDocument(int proposalId, int userId, MultipartFile file, DocumentType type) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        Optional<User> userOpt = userRepo.findById(userId);

        if (!proposalOpt.isPresent()) return "Proposal not found";
        if (!userOpt.isPresent()) return "User not found";

        try {
            ProposalDocument doc = new ProposalDocument(
                file.getOriginalFilename(),
                file.getContentType(),
                file.getSize(),
                file.getBytes(),
                type,
                proposalOpt.get(),
                userOpt.get()
            );
            docRepo.save(doc);
            return "Document uploaded successfully";

        } catch (IOException e) {
            return "Failed to upload document: " + e.getMessage();
        }
    }

    // Get all documents by proposal ID
    public List<ProposalDocument> getDocumentsByProposal(int proposalId) {
        Optional<Proposal> proposalOpt = proposalRepo.findById(proposalId);
        return proposalOpt.map(docRepo::findByProposal).orElse(Collections.emptyList());
    }

    public List<ProposalDocument> getDocumentsByIssuedPolicyId(int issuedPolicyId) {
        IssuedPolicy policy = issuedPolicyRepo.findById(issuedPolicyId)
            .orElseThrow(() -> new NoSuchElementException("Issued policy not found"));

        Proposal proposal = policy.getProposal();
        return docRepo.findByProposal(proposal);
    }

    // Delete a document
    public String deleteDocument(int docId) {
        if (!docRepo.existsById(docId)) return "Document not found";
        docRepo.deleteById(docId);
        return "Document deleted successfully";
    }

    // Get document by ID (for download)
    public ProposalDocument getDocumentById(int docId) {
        return docRepo.findById(docId).orElse(null);
    }
}
