package com.eshop.controller;

import com.eshop.entity.User;
import com.eshop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        if (userRepository.existsByEmail(body.get("email"))) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }

        User user = new User();
        user.setFirstName(body.get("firstName"));
        user.setLastName(body.get("lastName"));
        user.setEmail(body.get("email"));
        user.setUsername(body.get("email"));
        user.setPassword(passwordEncoder.encode(body.get("password")));
        user.setPhoneNumber(body.get("phoneNumber"));
        user.setActive(true);
        user.setRole(User.UserRole.CUSTOMER);

        User saved = userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "token", "dummy-token-" + saved.getId(),
                "user", Map.of(
                        "id", saved.getId(),
                        "email", saved.getEmail(),
                        "firstName", saved.getFirstName(),
                        "lastName", saved.getLastName(),
                        "phoneNumber", saved.getPhoneNumber()
                )
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        return userRepository.findByEmail(body.get("email"))
                .filter(u -> passwordEncoder.matches(body.get("password"), u.getPassword()))
                .map(u -> ResponseEntity.ok(Map.of(
                        "token", "dummy-token-" + u.getId(),
                        "user", Map.of(
                                "id", u.getId(),
                                "email", u.getEmail(),
                                "firstName", u.getFirstName(),
                                "lastName", u.getLastName(),
                                "phoneNumber", u.getPhoneNumber()
                        )
                )))
                .orElseGet(() -> ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials")));
    }
}
