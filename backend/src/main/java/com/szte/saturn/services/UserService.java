package com.szte.saturn.services;

import com.szte.saturn.controllers.requests.ChangePasswordRequest;
import com.szte.saturn.controllers.requests.CreateUserRequest;
import com.szte.saturn.controllers.requests.UpdateUserRequestDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.exceptions.ApiException;
import com.szte.saturn.mapper.UserMapper;
import com.szte.saturn.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserDTO create(final CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw ApiException.builder()
                    .message("This email is already taken")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
        }
        User user = new User(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userMapper.toDto(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public User findUserById(final Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BadCredentialsException("User not found"));
    }

    @Transactional(readOnly = true)
    public List<UserDTO> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return  userMapper.toListDto(users);
    }

    @Transactional(readOnly = true)
    public UserDTO getUserByEmail(final String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("User not found"));
        return userMapper.toDto(user);
    }

    @Transactional(readOnly = true)
    public List<UserDTO> findUsersNotAssignedToProject(
            final Long projectId,
            final Long currentUserId) {
        List<User> users = userRepository.findUsersNotInProject(projectId, currentUserId);
        return userMapper.toListDto(users);
    }

    @Transactional
    public void updateProfilePictureUrl(final String fileUrl, final Long userId) {
        User user = findUserById(userId);
        user.setProfilePictureUrl(fileUrl);
        userRepository.save(user);
    }

    @Transactional
    public UserDTO updateUser(final Long id, final UpdateUserRequestDTO request) {
        User user = findUserById(id);
        if (request.getFirstname() != null) {
            user.setFirstname(request.getFirstname());
        }
        if (request.getLastname() != null) {
            user.setLastname(request.getLastname());
        }

        userRepository.save(user);
        return userMapper.toDto(user);
    }

    @Transactional
    public void changePassword(final ChangePasswordRequest changePasswordRequest, final long userId) {
        User user = findUserById(userId);
        if (!passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new BadCredentialsException("Wrong password");
        }

        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(user);
    }
}
