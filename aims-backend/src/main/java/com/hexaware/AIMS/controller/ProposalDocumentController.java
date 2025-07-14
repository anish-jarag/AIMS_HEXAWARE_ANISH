package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.ProposalDocument;
import com.hexaware.AIMS.model.enums.DocumentType;
import com.hexaware.AIMS.service.ProposalDocumentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class ProposalDocumentController {

    @Autowired
    private ProposalDocumentService docService;

    // Upload a document
    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("proposalId") int proposalId,
            @RequestParam("userId") int userId,
            @RequestParam("documentType") DocumentType documentType,
            @RequestParam("file") MultipartFile file) {

        String result = docService.uploadDocument(proposalId, userId, file, documentType);
        return ResponseEntity.ok(result);
    }

    // Get all documents for a proposal
    @GetMapping("/proposal/{proposalId}")
    public ResponseEntity<List<ProposalDocument>> getDocumentsByProposal(@PathVariable int proposalId) {
        List<ProposalDocument> documents = docService.getDocumentsByProposal(proposalId);
        return ResponseEntity.ok(documents);
    }

    // Download a document by ID
    @GetMapping("/download/{docId}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable int docId) {
        ProposalDocument doc = docService.getDocumentById(docId);
        if (doc == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(doc.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFileName() + "\"")
                .body(doc.getFileData());
    }

    // Delete a document
    @DeleteMapping("/{docId}")
    public ResponseEntity<String> deleteDocument(@PathVariable int docId) {
        String result = docService.deleteDocument(docId);
        return ResponseEntity.ok(result);
    }
}
