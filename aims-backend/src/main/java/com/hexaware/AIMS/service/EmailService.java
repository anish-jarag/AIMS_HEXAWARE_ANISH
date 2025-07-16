package com.hexaware.AIMS.service;

import com.hexaware.AIMS.model.IssuedPolicy;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("testinghearaid@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        
        mailSender.send(message);
    }

    public void sendPaymentConfirmationWithPdf(String to, IssuedPolicy policy, byte[] pdfBytes) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true); // true = multipart

            helper.setFrom("no-reply@aims.com");
            helper.setTo(to);
            helper.setSubject("Your Policy Document - HexaShield");

            String content = "Hello " + policy.getUser().getFullName() + ",\n\n"
                            + "🎉 Congratulations! Your payment has been received and your policy is now active.\n\n"
                            + "📄 Policy Details:\n"
                            + "• Policy Number: " + policy.getIssuedPolicyId() + "\n"
                            + "• Coverage Amount: ₹" + policy.getCoverageAmount() + "\n"
                            + "• Valid From: " + policy.getStartDate() + "\n"
                            + "• Valid To: " + policy.getEndDate() + "\n"
                            + "• Vehicle: " + policy.getProposal().getVehicle().getRegistrationNumber()
                            + " (" + policy.getProposal().getVehicle().getVehicleType() + ")\n\n"
                            + "📎 Your official policy PDF is attached with this email.\n\n"
                            + "Thank you for choosing HexaShield Insurance.\n\n"
                            + "Warm regards,\n"
                            + "Team HexaShield";


            helper.setText(content);

            ByteArrayResource resource = new ByteArrayResource(pdfBytes);
            helper.addAttachment("Policy_" + policy.getIssuedPolicyId() + ".pdf", resource);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            System.err.println("Failed to send email with attachment: " + e.getMessage());
        }
    }
}
