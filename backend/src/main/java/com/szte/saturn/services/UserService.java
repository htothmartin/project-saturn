package com.szte.saturn.services;

import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.mapper.UserMapper;
import com.szte.saturn.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserDTO> allUsers(){
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);
        return  userMapper.toListDto(users);
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return null;
        }
        return userMapper.toDto(user);
    }
}
