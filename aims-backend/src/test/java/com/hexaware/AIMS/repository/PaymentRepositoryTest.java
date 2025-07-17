// package com.hexaware.AIMS.repository;

// import com.hexaware.AIMS.model.*;
// import com.hexaware.AIMS.model.enums.*;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;

// @SpringBootTest
// class PaymentRepositoryTest {

//     @Autowired private UserRepository userRepository;
//     @Autowired private VehicleRepository vehicleRepository;
//     @Autowired private PolicyRepository policyRepository;
//     @Autowired private ProposalRepository proposalRepository;
//     @Autowired private PaymentRepository paymentRepository;

//     @Test
//     void testSaveAndFindByProposal() {
//         // Step 1: Create user
//         User user = new User(
//                 "Shruti Desai",
//                 "Kolhapur",
//                 LocalDate.of(1991, 6, 22),
//                 "888899996666",
//                 "QWERT1234Z",
//                 "shruti@example.com",
//                 "pass123",
//                 Role.USER
//         );
//         userRepository.save(user);

//         // Step 2: Create vehicle
//         Vehicle vehicle = new Vehicle(
//                 "MH09ZZ9999",
//                 VehicleType.CAR,
//                 "Skoda",
//                 "Kushaq",
//                 2022,
//                 user
//         );
//         vehicleRepository.save(vehicle);

//         // Step 3: Create policy
//         Policy policy = new Policy(
//                 "Family Car Cover",
//                 "Best for families",
//                 9200.0,
//                 VehicleType.CAR,
//                 true
//         );
//         policyRepository.save(policy);

//         // Step 4: Create proposal
//         Proposal proposal = new Proposal(user, vehicle, policy, ProposalStatus.QUOTE_GENERATED, LocalDate.now(), null);
//         proposalRepository.save(proposal);

//         // Step 5: Create payment
//         Payment payment = new Payment(
//                 proposal,
//                 9500.0,
//                 PaymentMode.UPI,
//                 PaymentStatus.SUCCESS,
//                 LocalDateTime.now(),
//                 "TXN123ABC456"
//         );
//         paymentRepository.save(payment);

//         // Step 6: Fetch by proposal
//         Optional<Payment> result = paymentRepository.findByProposal(proposal).stream().findFirst();

//         assertTrue(result.isPresent());
//         assertEquals("TXN123ABC456", result.get().getTransactionReference());
//     }

//     @Test
//     void testFindByStatus() {
//         List<Payment> successPayments = paymentRepository.findByStatus(PaymentStatus.SUCCESS);
//         assertNotNull(successPayments);
//         assertTrue(successPayments.stream().anyMatch(p -> p.getStatus() == PaymentStatus.SUCCESS));
//     }
// }
