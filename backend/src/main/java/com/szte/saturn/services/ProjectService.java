package com.szte.saturn.services;

import com.szte.saturn.controllers.requests.AddUserToProjectRequest;
import com.szte.saturn.controllers.requests.CreateProjectRequest;
import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.entities.project.Project;
import com.szte.saturn.entities.User;
import com.szte.saturn.entities.rel_pinned_project.RelPinnedProject;
import com.szte.saturn.entities.rel_user_projects.ProjectRole;
import com.szte.saturn.entities.rel_user_projects.RelUserProjects;
import com.szte.saturn.enums.ProjectStatus;
import com.szte.saturn.exceptions.ApiException;
import com.szte.saturn.mapper.ProjectMapper;
import com.szte.saturn.repositories.ProjectRepository;
import com.szte.saturn.repositories.RelPinnedProjectRepository;
import com.szte.saturn.repositories.RelUserProjectsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final RelUserProjectsRepository relUserProjectsRepository;
    private final ProjectMapper projectMapper;
    private final UserService userService;
    private final RelPinnedProjectRepository relPinnedProjectRepository;

    @Transactional(readOnly = true)
    public Project getProjectById(Long projectId){
        return projectRepository.findById(projectId).orElseThrow(() -> ApiException.builder().message("Project not found").status(HttpStatus.NOT_FOUND.value()).build());
    }

    @Transactional
    public ProjectDTO create(CreateProjectRequest request, User user){
        Project project = new Project(request);
        project.setOwner(user);
        Project savedProject = projectRepository.save(project);
        relUserProjectsRepository.save(new RelUserProjects(user, savedProject, ProjectRole.OWNER));
        boolean isPinned = relUserProjectsRepository.existsByUserIdAndProjectId(user.getId(), savedProject.getId());
        return projectMapper.toDto(savedProject, user.getId(), isPinned);
    }

    @Transactional(readOnly = true)
    public List<ProjectDTO> getProjectsByUser(User user, String sortOrder, String name){
        Sort.Direction direction = sortOrder.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "project.name");
        List<Project> projects = relUserProjectsRepository.findProjectsByUserId(user.getId(), name, sort);

        return projects.stream().map(project -> {
            boolean isPinned = relPinnedProjectRepository.existsByUserIdAndProjectId(user.getId(), project.getId());
            return projectMapper.toDto(project, user.getId(), isPinned);
        }).toList();
    }

    @Transactional(readOnly = true)
    public ActiveProjectDTO getProject(Long projectId){
        if(!projectRepository.existsById(projectId)){
            throw ApiException.builder().message("Project not found").status(HttpStatus.NOT_FOUND.value()).build();
        }

        Project project = getProjectById(projectId);
        return projectMapper.toActiveProjectDTO(project);
    }

    @Transactional
    public ProjectDTO pinProject(Long userId, Long projectId){
        Optional<RelPinnedProject> pinnedProject = relPinnedProjectRepository.findByUserIdAndProjectId(userId, projectId);
        if(pinnedProject.isPresent()){
            pinnedProject.ifPresent(relPinnedProjectRepository::delete);
        } else {
            relPinnedProjectRepository.save(new RelPinnedProject(userId, projectId));
        }

        Project project = getProjectById(projectId);
        boolean isPinned = relPinnedProjectRepository.existsByUserIdAndProjectId(userId, project.getId());
        return projectMapper.toDto(project, userId, isPinned);
    }

    @Transactional
    public void addUserToProject(Long projectId, AddUserToProjectRequest request) {
        if(relUserProjectsRepository.existsByUserIdAndProjectId(request.getUserId(), projectId)){
            throw ApiException.builder().status(HttpStatus.CONFLICT.value()).message("This user already added to the project").build();
        }
        User user = userService.findUserById(request.getUserId());
        Project project = getProjectById(projectId);

        relUserProjectsRepository.save(new RelUserProjects(user, project, request.getRole()));
    }

    @Transactional
    public void deleteUserFromProject(Long projectId, Long userId) {
        if(relUserProjectsRepository.existsByUserIdAndProjectId(userId, projectId)){
            throw ApiException.builder().status(HttpStatus.CONFLICT.value()).message("This user is not exists or not added to the project").build();
        }

        relUserProjectsRepository.deleteByUserIdAndProjectId(userId, projectId);
    }

    @Transactional
    public void delete(Long projectId){
        if(!projectRepository.existsById(projectId)){
            throw ApiException.builder().message("Project not found").status(HttpStatus.NOT_FOUND.value()).build();
        }
        projectRepository.deleteById(projectId);
    }
}
