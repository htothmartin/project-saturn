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
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper, TicketRepository ticketRepository, UserRepository userRepository){
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(CreateProjectDto request, User user){
        Project project = new Project(request);
        project.setOwner(user);
        project.setStatus(ProjectStatus.ACTIVE);

        return projectRepository.save(project);
    }

    public List<ProjectDTO> getProjectsByUser(User user, String sortOrder, String name){
        Sort.Direction direction = sortOrder.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "name");
        List<Project> projects = projectRepository.findProjectsByUser(user.getId(), name, sort);

        return projectMapper.toListDto(projects, user.getId());
    }

    public ActiveProjectDTO getProject(Long id, Long userId){

        Project project = projectRepository.findById(id).orElse(null);
        List<Ticket> tickets = ticketRepository.findByProjectId(id);
        Set<User> users = projectRepository.findUsersByProjectId(id);


        return projectMapper.toActiveProjectDTO(project, tickets, users, userId);
    }

    public ProjectDTO pinProject(Long id, Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Project project = projectRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Project not found"));
        if(user.getPinnedProjects().contains(project)){
            user.getPinnedProjects().remove(project);
        } else {
            user.getPinnedProjects().add(project);
        }
        userRepository.save(user);

        System.out.println(project.getName());

        return projectMapper.toDto(project, user.getId());
    }


}
