// package com.hexaware.AIMS.repository;

// import com.hexaware.AIMS.model.*;
// import com.hexaware.AIMS.model.enums.ProposalStatus;
// import com.hexaware.AIMS.model.enums.Role;
// import com.hexaware.AIMS.model.enums.VehicleType;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import java.time.LocalDate;
// import java.util.List;

// import static org.junit.jupiter.api.Assertions.*;

// @SpringBootTest
// class ProposalRepositoryTest {

//     @Autowired
//     private ProposalRepository proposalRepository;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private VehicleRepository vehicleRepository;

//     @Autowired
//     private PolicyRepository policyRepository;

//     @Test
//     void testSaveAndFindByUser() {
//         // Create and save user
//         User user = new User(
//                 "Deepali Rane",
//                 "Solapur",
//                 LocalDate.of(1992, 8, 12),
//                 "555566667777",
//                 "PQRAB1234N",
//                 "deepali@example.com",
//                 "pass123",
//                 Role.USER
//         );
//         userRepository.save(user);

//         // Create and save vehicle
//         Vehicle vehicle = new Vehicle(
//                 "MH20AB1234",
//                 VehicleType.CAR,
//                 "Hyundai",
//                 "i20",
//                 2019,
//                 user
//         );
//         vehicleRepository.save(vehicle);

//         // Create and save policy
//         Policy policy = new Policy(
//                 "Standard Car Policy",
//                 "Full coverage for cars",
//                 8000.0,
//                 VehicleType.CAR,
//                 true
//         );
//         policyRepository.save(policy);

//         // Create and save proposal
//         Proposal proposal = new Proposal();
//         proposal.setUser(user);
//         proposal.setVehicle(vehicle);
//         proposal.setPolicy(policy);
//         proposal.setStatus(ProposalStatus.SUBMITTED);
//         proposal.setSubmissionDate(LocalDate.now());
//         proposalRepository.save(proposal);

//         List<Proposal> userProposals = proposalRepository.findByUser(user);
//         assertEquals(1, userProposals.size());
//         assertEquals(ProposalStatus.SUBMITTED, userProposals.get(0).getStatus());
//     }

//     @Test
//     void testFindByStatus() {
//         List<Proposal> submitted = proposalRepository.findByStatus(ProposalStatus.SUBMITTED);
//         assertNotNull(submitted);
//     }
// }
