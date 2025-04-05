package com.szte.saturn.controllers;

import com.szte.saturn.controllers.requests.UpdateUserRequestDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.mapper.UserMapper;
import com.szte.saturn.services.MinioService;
import com.szte.saturn.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;
    private final MinioService minioService;
    @Autowired
    private UserMapper userMapper;

    public UserController(final UserService userService, final MinioService minioService) {
        this.userService = userService;
        this.minioService = minioService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userMapper.toDto(currentUser));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> allUser() {
        List<UserDTO>  users = userService.allUsers();

        return ResponseEntity.ok(users);
    }

    @PatchMapping
    public ResponseEntity<UserDTO> updateUser(
            @RequestBody final UpdateUserRequestDTO updateUserRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        UserDTO userDTO = userService.updateUser(currentUser.getId(), updateUserRequestDTO);

        return ResponseEntity.ok(userDTO);
    }


    @GetMapping("/not-in-project/{projectId}")
    public ResponseEntity<List<UserDTO>> getUsersNotInProject(@PathVariable final Long projectId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<UserDTO> users = userService.findUsersNotAssignedToProject(
                projectId,
                currentUser.getId());

        return ResponseEntity.ok(users);
    }

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") final MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        String fileName = minioService.uploadFile(file);

        String signedUrl = minioService.generatePreSignedUrl(fileName);

        userService.updateProfilePictureUrl(fileName, currentUser.getId());

        return ResponseEntity.ok(
                Map.of("message", "File uploaded successfully", "profilePictureUrl", signedUrl));
    }


}
