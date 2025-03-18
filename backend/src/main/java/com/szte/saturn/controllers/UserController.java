package com.szte.saturn.controllers;

import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.services.MinioService;
import com.szte.saturn.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;
    private final MinioService minioService;

    public UserController(UserService userService, MinioService minioService){
        this.userService = userService;
        this.minioService = minioService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> allUser(){
        List<UserDTO>  users = userService.allUsers();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/not-in-project/{projectId}")
    public ResponseEntity<List<UserDTO>> getUsersNotInProject(@PathVariable Long projectId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<UserDTO> users = userService.findUsersNotAssignedToProject(projectId, currentUser.getId());
        return ResponseEntity.ok(users);
    }

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        String fileUrl = minioService.uploadFile(file);

        userService.updateProfilePictureUrl(fileUrl, currentUser.getId());

        return ResponseEntity.ok(Map.of("message", "File uploaded successfully", "filePath", fileUrl));
    }


}
