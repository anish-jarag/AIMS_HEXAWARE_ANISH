package com.hexaware.AIMS.controller;

import com.hexaware.AIMS.model.ClaimDocument;
import com.hexaware.AIMS.model.enums.DocumentType;
import com.hexaware.AIMS.service.ClaimDocumentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/claim-documents")
public class ClaimDocumentController {

    @Autowired
    private ClaimDocumentService docService;

    // Upload document
    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("claimId") int claimId,
            @RequestParam("userId") int userId,
            @RequestParam("documentType") DocumentType documentType,
            @RequestParam("file") MultipartFile file) {

        String result = docService.uploadDocument(claimId, userId, file, documentType);
        return ResponseEntity.ok(result);
    }

    // Get documents by claim
    @GetMapping("/claim/{claimId}")
    public ResponseEntity<List<ClaimDocument>> getDocumentsByClaim(@PathVariable int claimId) {
        List<ClaimDocument> documents = docService.getDocumentsByClaim(claimId);
        return ResponseEntity.ok(documents);
    }

    // Download document
    @GetMapping("/download/{docId}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable int docId) {
        ClaimDocument doc = docService.getDocumentById(docId);
        if (doc == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(doc.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFileName() + "\"")
                .body(doc.getFileData());
    }

    // Delete document
    @DeleteMapping("/{docId}")
    public ResponseEntity<String> deleteDocument(@PathVariable int docId) {
        String result = docService.deleteDocument(docId);
        return ResponseEntity.ok(result);
    }
}
