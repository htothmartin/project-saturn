package com.szte.saturn.services;

import com.szte.saturn.controllers.AuthenticationController;
import com.szte.saturn.controllers.dtos.RegisterUserDto;
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

    public User signUp(RegisterUserDto request) {
        User user = new User(request);
        user.setPassword(passwordEncoder.encode((request.getPassword())));

        return userRepository.save(user);
    }

    public User signIn(AuthenticationController.LoginUserDto request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        return userRepository.findByEmail(request.getEmail()).orElseThrow();
    }

}
