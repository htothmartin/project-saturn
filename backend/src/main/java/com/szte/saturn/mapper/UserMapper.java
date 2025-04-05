package com.szte.saturn.mapper;

import com.szte.saturn.dtos.ProjectUsersDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.entities.rel_user_projects.ProjectRole;
import com.szte.saturn.services.MinioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Component
public class UserMapper {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MinioService minioService;
    @Autowired
    private ConnectedAccountMapper connectedAccountMapper;

    public UserDTO toDto(final User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        if (!Objects.equals(user.getProfilePictureUrl(), "")) {
            userDTO.setProfilePictureUrl(
                    minioService.generatePreSignedUrl(user.getProfilePictureUrl()));
        }

        if (!user.getConnectedAccounts().isEmpty()) {
            userDTO.setConnectedAccounts(
                    connectedAccountMapper.toListDTO(user.getConnectedAccounts())
            );
        }

        userDTO.setFullName(user.getFirstname() + " " + user.getLastname());
        return userDTO;
    }

    public ProjectUsersDTO toProjectUsersDTO(final User user, final ProjectRole role) {
        UserDTO userDTO = toDto(user);
        ProjectUsersDTO projectUsersDTO = modelMapper.map(userDTO, ProjectUsersDTO.class);
        projectUsersDTO.setRole(role);
        return projectUsersDTO;
    }

    public List<UserDTO> toListDto(final List<User> users) {
        return users.stream().map(this::toDto).collect(Collectors.toList());
    }


}
