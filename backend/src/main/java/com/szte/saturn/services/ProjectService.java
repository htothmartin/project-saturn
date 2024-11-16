package com.szte.saturn.services;

import com.szte.saturn.dtos.CreateProjectDto;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.ProjectStatus;
import com.szte.saturn.mapper.ProjectMapper;
import com.szte.saturn.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper){
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
    }

    public Project createProject(CreateProjectDto request, User user){
        Project project = new Project(request);
        project.setOwner(user);
        project.setProjectStatus(ProjectStatus.ACTIVE);

        return projectRepository.save(project);
    }

    public List<ProjectDTO> getAllProjects(User user){
        List<Project> projects = projectRepository.findByOwnerId(user.getId());

        return projectMapper.toListDto(projects);
    }

    public ProjectDTO getProject(Integer id){

        Project project = projectRepository.findById(id).orElse(null);

        return projectMapper.toDto(project);
    }


}
