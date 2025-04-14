package com.szte.saturn.mapper;

import com.szte.saturn.dtos.SprintDTO;
import com.szte.saturn.entities.Sprint;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SprintMapper {

    @Autowired
    private ModelMapper modelMapper;

    public SprintDTO toDTO(final Sprint sprint) {
        return modelMapper.map(sprint, SprintDTO.class);
    }

}
