package com.szte.saturn.mapper;

import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.services.MinioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class UserMapper {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MinioService minioService;

    public UserDTO toDto(User user) {
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setProfilePictureUrl(minioService.generatePresignedUrl(user.getProfilePictureUrl()));

        userDTO.setFullName(user.getFirstname() + " " + user.getLastname());
        return userDTO;
    }

    public List<UserDTO> toListDto(List<User> users) {
        return users.stream().map(this::toDto).collect(Collectors.toList());
    }


}
