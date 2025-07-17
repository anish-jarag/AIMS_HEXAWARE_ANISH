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
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;

// @SpringBootTest
// class IssuedPolicyRepositoryTest {

//     @Autowired private IssuedPolicyRepository issuedPolicyRepository;
//     @Autowired private UserRepository userRepository;
//     @Autowired private VehicleRepository vehicleRepository;
//     @Autowired private PolicyRepository policyRepository;
//     @Autowired private ProposalRepository proposalRepository;

//     @Test
//     void testSaveAndFindByUser() {
//         // Step 1: Create user
//         User user = new User("Amit Borkar", "Nagpur", LocalDate.of(1985, 3, 11),
//                 "999922223333", "ASDFG1234L", "amit@example.com", "pass123", Role.USER);
//         userRepository.save(user);

//         // Step 2: Vehicle
//         Vehicle vehicle = new Vehicle("MH31AM1234", VehicleType.CAR, "Honda", "City", 2020, user);
//         vehicleRepository.save(vehicle);

//         // Step 3: Policy
//         Policy policy = new Policy("Sedan Cover", "Protection for sedans", 7000.0, VehicleType.CAR, true);
//         policyRepository.save(policy);

//         // Step 4: Proposal
//         Proposal proposal = new Proposal(user, vehicle, policy, ProposalStatus.APPROVED, LocalDate.now(), null);
//         proposalRepository.save(proposal);

//         // Step 5: IssuedPolicy
//         IssuedPolicy issuedPolicy = new IssuedPolicy(user, policy, proposal, 250000.0,
//                 LocalDate.now(), LocalDate.now().plusYears(1), "sedan_policy.pdf");
//         issuedPolicyRepository.save(issuedPolicy);

//         // Step 6: Verify findByUser
//         List<IssuedPolicy> userPolicies = issuedPolicyRepository.findByUser(user);
//         assertFalse(userPolicies.isEmpty());
//         assertEquals("Sedan Cover", userPolicies.get(0).getPolicy().getPolicyName());
//     }

//     @Test
//     void testFindByProposal() {
//         List<Proposal> allProposals = proposalRepository.findAll();
//         if (!allProposals.isEmpty()) {
//             Proposal proposal = allProposals.get(0);
//             Optional<IssuedPolicy> result = issuedPolicyRepository.findByProposal(proposal);
//             assertTrue(result.isPresent());
//             assertEquals(proposal.getProposalId(), result.get().getProposal().getProposalId());
//         } else {
//             System.out.println("No proposals found for testing.");
//         }
//     }
// }
