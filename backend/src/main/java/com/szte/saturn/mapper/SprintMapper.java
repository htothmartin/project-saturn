package com.szte.saturn.mapper;

import com.szte.saturn.dtos.SprintDTO;
import com.szte.saturn.entities.Sprint;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SprintMapper {
    private final ModelMapper modelMapper;

    public SprintDTO toDTO(final Sprint sprint) {
        return modelMapper.map(sprint, SprintDTO.class);
    }

}
