package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.Claim;
import com.hexaware.AIMS.model.ClaimDocument;
import com.hexaware.AIMS.model.User;
import com.hexaware.AIMS.model.enums.DocumentType;
import com.hexaware.AIMS.repository.ClaimDocumentRepository;
import com.hexaware.AIMS.repository.ClaimRepository;
import com.hexaware.AIMS.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ClaimDocumentService {

    @Autowired
    private ClaimRepository claimRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ClaimDocumentRepository docRepo;

    public String uploadDocument(int claimId, int userId, MultipartFile file, DocumentType documentType) {
        Optional<Claim> claimOpt = claimRepo.findById(claimId);
        Optional<User> userOpt = userRepo.findById(userId);

        if (!claimOpt.isPresent()) return "Claim not found";
        if (!userOpt.isPresent()) return "User not found";

        try {
            ClaimDocument doc = new ClaimDocument(
                file.getOriginalFilename(),
                file.getContentType(),
                file.getSize(),
                file.getBytes(),
                documentType,
                claimOpt.get(),
                userOpt.get()
            );

            docRepo.save(doc);
            return "Claim document uploaded successfully";

        } catch (IOException e) {
            return "File upload failed: " + e.getMessage();
        }
    }

    public List<ClaimDocument> getDocumentsByClaim(int claimId) {
        Optional<Claim> claimOpt = claimRepo.findById(claimId);
        return claimOpt.map(docRepo::findByClaim).orElse(Collections.emptyList());
    }

    public ClaimDocument getDocumentById(int docId) {
        return docRepo.findById(docId).orElse(null);
    }

    public String deleteDocument(int docId) {
        if (!docRepo.existsById(docId)) return "Document not found";
        docRepo.deleteById(docId);
        return "Claim document deleted successfully";
    }
}
