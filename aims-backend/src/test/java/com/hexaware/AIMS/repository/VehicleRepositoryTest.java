// package com.hexaware.AIMS.repository;

// import com.hexaware.AIMS.model.User;
// import com.hexaware.AIMS.model.Vehicle;
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
// class VehicleRepositoryTest {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private VehicleRepository vehicleRepository;

//     @Test
//     void testFindByOwner() {
//         User user = new User(
//                 "Rohit Deshmukh",
//                 "Nashik",
//                 LocalDate.of(1995, 3, 20),
//                 "444455556666",
//                 "LMNOP1234A",
//                 "rohit@example.com",
//                 "pass456",
//                 Role.USER
//         );
//         userRepository.save(user);

//         Vehicle vehicle = new Vehicle(
//                 "MH12AB1234",
//                 VehicleType.CAR,
//                 "Maruti",
//                 "Swift",
//                 2020,
//                 user
//         );
//         vehicleRepository.save(vehicle);

//         List<Vehicle> vehicles = vehicleRepository.findByOwner(user);
//         assertEquals(1, vehicles.size());
//         assertEquals("MH12AB1234", vehicles.get(0).getRegistrationNumber());
//     }

//     @Test
//     void testFindByRegistrationNumber() {
//         User user = new User(
//                 "Kiran Patil",
//                 "Mumbai",
//                 LocalDate.of(1988, 7, 10),
//                 "777788889999",
//                 "ABCDE6789F",
//                 "kiran@example.com",
//                 "pass789",
//                 Role.USER
//         );
//         userRepository.save(user);

//         Vehicle vehicle = new Vehicle(
//                 "MH14XY9876",
//                 VehicleType.BIKE,
//                 "Yamaha",
//                 "FZ",
//                 2022,
//                 user
//         );
//         vehicleRepository.save(vehicle);

//         Optional<Vehicle> result = vehicleRepository.findByRegistrationNumber("MH14XY9876");

//         assertTrue(result.isPresent());
//         assertEquals("Yamaha", result.get().getMake());
//     }
// }
