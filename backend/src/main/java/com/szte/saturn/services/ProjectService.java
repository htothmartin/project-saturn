package com.szte.saturn.services;

import com.szte.saturn.controllers.dtos.CreateProjectDto;
import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.ProjectStatus;
import com.szte.saturn.mapper.ProjectMapper;
import com.szte.saturn.repositories.ProjectRepository;
import com.szte.saturn.repositories.TicketRepository;
import com.szte.saturn.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final TicketRepository ticketRepository;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper, TicketRepository ticketRepository, UserRepository userRepository){
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.ticketRepository = ticketRepository;
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

    public ActiveProjectDTO getProject(Integer id){

        Project project = projectRepository.findById(id).orElse(null);
        List<Ticket> tickets = ticketRepository.findByProjectId(id);
        Set<User> users = projectRepository.findUsersByProjectId(id);


        return projectMapper.toActiveProjectDTO(project, tickets, users);
    }


}
