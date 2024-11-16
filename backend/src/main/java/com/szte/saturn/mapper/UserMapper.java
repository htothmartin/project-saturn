package com.szte.saturn.mapper;

import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {


    @Autowired
    private ModelMapper modelMapper;

    public UserDTO toDto(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public List<UserDTO> toListDto(List<User> users) {
        return users.stream().map(this::toDto).collect(Collectors.toList());
    }


}
