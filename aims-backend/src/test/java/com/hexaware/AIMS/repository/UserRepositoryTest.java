// package com.hexaware.AIMS.repository;

// import com.hexaware.AIMS.model.User;
// import com.hexaware.AIMS.model.enums.Role;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

// import java.time.LocalDate;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;

// @DataJpaTest
// class UserRepositoryTest {

//     @Autowired
//     private UserRepository userRepository;

//     @Test
//     void testSaveAndFindByEmail() {
//         User user = new User(
//                 "Anish Jarag",
//                 "Pune, India",
//                 LocalDate.of(2000, 5, 15),
//                 "123456789012",
//                 "ABCDE1234F",
//                 "anish@example.com",
//                 "securePass123",
//                 Role.USER
//         );

//         userRepository.save(user);

//         Optional<User> result = userRepository.findByEmail("anish@example.com");

//         assertTrue(result.isPresent());
//         assertEquals("Anish Jarag", result.get().getFullName());
//     }
// }
