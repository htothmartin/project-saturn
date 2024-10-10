package com.szte.saturn.services;

import com.szte.saturn.entities.User;
import com.szte.saturn.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<User> allUsers(){
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return  users;
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }
    
}
