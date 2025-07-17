// package com.hexaware.AIMS.repository;

// import com.hexaware.AIMS.model.*;
// import com.hexaware.AIMS.model.enums.ClaimStatus;
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
// class ClaimRepositoryTest {

//     @Autowired private ClaimRepository claimRepository;
//     @Autowired private UserRepository userRepository;
//     @Autowired private VehicleRepository vehicleRepository;
//     @Autowired private PolicyRepository policyRepository;
//     @Autowired private ProposalRepository proposalRepository;
//     @Autowired private IssuedPolicyRepository issuedPolicyRepository;

//     @Test
//     void testSaveAndFindBySubmittedBy() {
//         // Step 1: Create user
//         User user = new User("Neha Sharma", "Nanded", LocalDate.of(1990, 2, 15),
//                 "999988887777", "ZXCVB1234L", "neha@example.com", "pass123", Role.USER);
//         userRepository.save(user);

//         // Step 2: Create vehicle
//         Vehicle vehicle = new Vehicle("MH22AB2222", VehicleType.CAR, "Tata", "Altroz", 2021, user);
//         vehicleRepository.save(vehicle);

//         // Step 3: Create policy
//         Policy policy = new Policy("Car Coverage", "Full cover", 8500, VehicleType.CAR, true);
//         policyRepository.save(policy);

//         // Step 4: Create proposal
//         Proposal proposal = new Proposal(user, vehicle, policy, ProposalStatus.APPROVED, LocalDate.now(), null);
//         proposalRepository.save(proposal);

//         // Step 5: Create issued policy
//         IssuedPolicy issuedPolicy = new IssuedPolicy(user, policy, proposal, 200000, LocalDate.now(), LocalDate.now().plusYears(1), "policy.pdf");
//         issuedPolicyRepository.save(issuedPolicy);

//         // Step 6: Create claim
//         Claim claim = new Claim(issuedPolicy, user, "Accident on highway", 50000, ClaimStatus.INITIATED, LocalDate.now());
//         claimRepository.save(claim);

//         // Step 7: Verify findBySubmittedBy
//         List<Claim> claims = claimRepository.findBySubmittedBy(user);
//         assertFalse(claims.isEmpty());
//         assertEquals("Accident on highway", claims.get(0).getClaimReason());
//     }

//     @Test
//     void testFindByStatus() {
//         List<Claim> result = claimRepository.findByStatus(ClaimStatus.INITIATED);
//         assertNotNull(result);
//     }

//     @Test
//     void testFindByIssuedPolicy() {
//         // Use any available issued policy
//         List<IssuedPolicy> issued = issuedPolicyRepository.findAll();
//         if (!issued.isEmpty()) {
//             List<Claim> claims = claimRepository.findByIssuedPolicy(issued.get(0));
//             assertNotNull(claims);
//         } else {
//             System.out.println("No issued policies found for testing.");
//         }
//     }
// }
