package com.szte.saturn.controllers;

import com.szte.saturn.controllers.dtos.CreateProjectDto;
import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.CommentDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.dtos.UserDTO;
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
    public ResponseEntity<List<ProjectDTO>> getProjectByUser(@RequestParam(defaultValue = "asc") String sort, @RequestParam(defaultValue = "") String q) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        List<ProjectDTO> projectsList = projectService.getProjectsByUser(currentUser, sort, q);

        return ResponseEntity.ok(projectsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActiveProjectDTO> getProjectById(@PathVariable Long id) {

        ActiveProjectDTO activeProject = projectService.getProject(id);

        return ResponseEntity.ok(activeProject);
    }

    @PostMapping("/{id}/pin")
    public ResponseEntity<ProjectDTO> pinProject(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        ProjectDTO pinnedProject = projectService.pinProject(id, currentUser.getId());

        return ResponseEntity.ok(pinnedProject);
    }

    @PostMapping("/{projectId}/users/{userId}")
    public ResponseEntity<String> addUserToProject(@PathVariable Long projectId,  @PathVariable Long userId) {

        projectService.addUserToProject(projectId, userId);


        return ResponseEntity.ok().body("Successfully added to project");
    }

    @DeleteMapping("/{projectId}/users/{userId}")
    public ResponseEntity<String> deleteUserFromProject(@PathVariable Long projectId,  @PathVariable Long userId) {
        projectService.deleteUserFromProject(projectId, userId);

        return ResponseEntity.ok().body("Successfully deleted from project");
    }
}
