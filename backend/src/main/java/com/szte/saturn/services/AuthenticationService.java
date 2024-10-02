package com.szte.saturn.services;

import com.szte.saturn.dtos.LoginUserDto;
import com.szte.saturn.dtos.RegisterUserDto;
import com.szte.saturn.entities.User;
import com.szte.saturn.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User signup(RegisterUserDto input) {
        System.out.println(input.getFirstName());
        System.out.println(input.getLastName());
        System.out.println(input.getEmail());
        System.out.println(input.getPassword());

        User user = new User().setFirstName(input.getFirstName()).setLastName(input.getLastName()).setEmail(input.getEmail()).setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);

    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));

        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }

}
