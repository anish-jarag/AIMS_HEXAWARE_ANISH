package com.hexaware.AIMS.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hexaware.AIMS.model.enums.DocumentType;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProposalDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int documentId;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileType;

    @Column(nullable = false)
    private Long fileSize;

    @Lob
    @Column(length = 500000)
    private byte[] fileData;

    private LocalDateTime uploadedAt = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocumentType documentType;

    @ManyToOne(optional = false)
    @JoinColumn(name = "proposal_id")
    private Proposal proposal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "uploaded_by")
    private User uploadedBy;

    // Constructors
    public ProposalDocument() {}

    public ProposalDocument(String fileName, String fileType, Long fileSize, byte[] fileData,
                            DocumentType documentType, Proposal proposal, User uploadedBy) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.fileData = fileData;
        this.documentType = documentType;
        this.proposal = proposal;
        this.uploadedBy = uploadedBy;
        this.uploadedAt = LocalDateTime.now();
    }

	public int getDocumentId() {
		return documentId;
	}

	public void setDocumentId(int documentId) {
		this.documentId = documentId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public byte[] getFileData() {
		return fileData;
	}

	public void setFileData(byte[] fileData) {
		this.fileData = fileData;
	}

	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(LocalDateTime uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

	public DocumentType getDocumentType() {
		return documentType;
	}

	public void setDocumentType(DocumentType documentType) {
		this.documentType = documentType;
	}

	public Proposal getProposal() {
		return proposal;
	}

	public void setProposal(Proposal proposal) {
		this.proposal = proposal;
	}

	public User getUploadedBy() {
		return uploadedBy;
	}

	public void setUploadedBy(User uploadedBy) {
		this.uploadedBy = uploadedBy;
	}
    
    
    
}
