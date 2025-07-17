// package com.hexaware.AIMS.repository;

// import com.hexaware.AIMS.model.Policy;
// import com.hexaware.AIMS.model.enums.VehicleType;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import java.util.List;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;

// @SpringBootTest
// class PolicyRepositoryTest {

//     @Autowired
//     private PolicyRepository policyRepository;

//     @Test
//     void testSaveAndFindByVehicleType() {
//         // Create and save a policy
//         Policy policy = new Policy(
//                 "Policy for Bikes",
//                 "Covers all types of bike damages",
//                 3500.0,
//                 VehicleType.BIKE,
//                 true
//         );

//         policyRepository.save(policy);
//         policyRepository.flush(); // Ensure DB writes

//         // Fetch all bike policies
//         List<Policy> result = policyRepository.findByVehicleType(VehicleType.BIKE);

//         // Verify that the saved policy exists in the result
//         assertTrue(result.stream().anyMatch(p -> p.getPolicyName().equals("Policy for Bikes")));
//     }

//     @Test
//     void testFindByIsActiveTrue() {
//         // Save an active and an inactive policy
//         Policy activePolicy = new Policy(
//                 "Active Policy",
//                 "Active truck policy",
//                 9000.0,
//                 VehicleType.TRUCK,
//                 true
//         );

//         Policy inactivePolicy = new Policy(
//                 "Inactive Policy",
//                 "This one is disabled",
//                 5000.0,
//                 VehicleType.CAR,
//                 false
//         );

//         policyRepository.save(activePolicy);
//         policyRepository.save(inactivePolicy);
//         policyRepository.flush(); // Persist before fetch

//         // Fetch all active policies
//         List<Policy> activeList = policyRepository.findByIsActiveTrue();

//         assertTrue(activeList.stream().anyMatch(p -> p.getPolicyName().equals("Active Policy")));
//         assertFalse(activeList.stream().anyMatch(p -> p.getPolicyName().equals("Inactive Policy")));
//     }

//     @Test
//     void testFindById() {
//         Policy policy = new Policy(
//                 "ID Fetch Policy",
//                 "Testing findById",
//                 7000.0,
//                 VehicleType.CAR,
//                 true
//         );

//         policyRepository.save(policy);
//         policyRepository.flush();

//         int policyId = policy.getPolicyId();

//         Optional<Policy> fetched = policyRepository.findById(policyId);

//         assertTrue(fetched.isPresent());
//         assertEquals("ID Fetch Policy", fetched.get().getPolicyName());
//     }
// }
