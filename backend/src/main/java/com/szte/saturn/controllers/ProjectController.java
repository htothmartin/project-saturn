package com.szte.saturn.controllers;

import com.szte.saturn.controllers.dtos.CreateProjectDto;
import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.User;
import com.szte.saturn.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/projects")
@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    @PostMapping()
    public ResponseEntity<Project> create(@RequestBody CreateProjectDto createProjectDto) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
        Project newProject = projectService.createProject(createProjectDto, currentUser);
        return ResponseEntity.ok(newProject);
    }

    @GetMapping()
    public ResponseEntity<List<ProjectDTO>> getProjectByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<ProjectDTO> projectsList = projectService.getAllProjects(currentUser);

        return ResponseEntity.ok(projectsList);
    }

    @GetMapping("/id")
    public ResponseEntity<ActiveProjectDTO> getProjectById(@RequestParam Integer id) {

        ActiveProjectDTO activeProject = projectService.getProject(id);

        return ResponseEntity.ok(activeProject);


    }

}
