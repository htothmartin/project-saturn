package com.szte.saturn.mapper;

import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.entities.Project;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    @Autowired
    private ModelMapper modelMapper;

    public ProjectDTO toDto(Project project) {
        return modelMapper.map(project, ProjectDTO.class);
    }

    public List<ProjectDTO> toListDto(List<Project> projects) {
        return projects.stream().map(this::toDto).collect(Collectors.toList());
    }


}
