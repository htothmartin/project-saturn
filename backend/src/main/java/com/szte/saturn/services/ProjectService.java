package com.szte.saturn.services;

import com.szte.saturn.controllers.dtos.CreateProjectDto;
import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.ProjectStatus;
import com.szte.saturn.mapper.ProjectMapper;
import com.szte.saturn.repositories.ProjectRepository;
import com.szte.saturn.repositories.TicketRepository;
import com.szte.saturn.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;
    private final UserService userService;

    public ProjectService(ProjectRepository projectRepository, ProjectMapper projectMapper,@Lazy UserService userService) {
        this.projectRepository = projectRepository;
        this.projectMapper = projectMapper;
        this.userService = userService;
    }

    public Project getProjectById(Long projectId){
        return projectRepository.findById(projectId).orElseThrow(() -> new EntityNotFoundException("User not found"));
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

    public ActiveProjectDTO getProject(Long projectId){

        Project project = getProjectById(projectId);

        return projectMapper.toActiveProjectDTO(project);
    }

    public ProjectDTO pinProject(Long projectId, Long userId){
        User user = userService.findUserById(userId);
        Project project = getProjectById(projectId);

        if(project.getPinnedProjects().contains(user)){
            project.getPinnedProjects().remove(user);
        } else {
            project.getPinnedProjects().add(user);
        }
        projectRepository.save(project);

        return projectMapper.toDto(project, user.getId());
    }

    public void addUserToProject(Long projectId, Long userId) {
        User user = userService.findUserById(userId);
        Project project = getProjectById(projectId);
        if(user.getProjects().contains(project) || project.getOwner().getId().equals(user.getId())){
            throw new IllegalArgumentException("This user already added to the project");
        }
        project.getUsers().add(user);
        projectRepository.save(project);
    }

    public void deleteUserFromProject(Long projectId, Long userId) {
        User user = userService.findUserById(userId);
        Project project = getProjectById(projectId);

        project.getUsers().remove(user);
        projectRepository.save(project);
    }
}
