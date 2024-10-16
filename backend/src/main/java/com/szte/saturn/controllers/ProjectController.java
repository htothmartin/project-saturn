package com.szte.saturn.controllers;

import com.szte.saturn.dtos.CreateProjectDto;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.User;
import com.szte.saturn.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/projects")
@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService){
        this.projectService = projectService;
    }

    @PostMapping("/create")
    public ResponseEntity<Project> create(@RequestBody CreateProjectDto createProjectDto) {
        System.out.println(createProjectDto.getName());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
        System.out.println(currentUser);
        System.out.println(createProjectDto.getDescription());
        System.out.println(createProjectDto.getImageUrl());
        Project newProject = projectService.createProject(createProjectDto, currentUser);
        return ResponseEntity.ok(newProject);
    }

    @GetMapping("/")
    public ResponseEntity<List<Project>> getProjectByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        List<Project> projectsList = projectService.getAllProjects(currentUser);

        return ResponseEntity.ok(projectsList);
    }




}
