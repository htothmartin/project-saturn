package com.szte.saturn.services;

import com.szte.saturn.controllers.dtos.UpdateUserRequestDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.User;
import com.szte.saturn.mapper.UserMapper;
import com.szte.saturn.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;
    private final ProjectService projectService;

    public UserService(UserRepository userRepository, UserMapper userMapper,@Lazy ProjectService projectService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.projectService = projectService;
    }

    public User findUserById(Long userId){
        return userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
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

    public List<UserDTO> findUsersNotAssignedToProject(Long projectId, Long currentUserId) {
        Project project = projectService.getProjectById(projectId);
        List<User> users = userRepository.findUsersNotInProject(projectId, project.getOwner().getId(), currentUserId);

        return userMapper.toListDto(users);
    }

    public void updateProfilePictureUrl(String fileUrl, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setProfilePictureUrl(fileUrl);
        userRepository.save(user);
    }

    public UserDTO updateUser(Long id, UpdateUserRequestDTO request) {
        User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
        if(request.getFirstname() != null){
            user.setFirstname(request.getFirstname());
        }
        if(request.getLastname() != null){
            user.setLastname(request.getLastname());
        }

        userRepository.save(user);
        return userMapper.toDto(user);
    }
}
