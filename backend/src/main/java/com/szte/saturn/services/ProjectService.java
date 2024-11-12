package com.szte.saturn.services;

import com.szte.saturn.dtos.CreateProjectDto;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.ProjectStatus;
import com.szte.saturn.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    public Project createProject(CreateProjectDto request, User user){
        Project project = new Project(request);
        project.setOwner(user);
        project.setProjectStatus(ProjectStatus.ACTIVE);

        return projectRepository.save(project);
    }

    public List<Project> getAllProjects(User user){
        return projectRepository.findByOwnerId(user.getId());
    }

    public Project getProject(Integer id){ return projectRepository.findById(id).orElse(null); }


}
