package com.szte.saturn.controllers;

import com.szte.saturn.controllers.requests.AddUserToProjectRequest;
import com.szte.saturn.controllers.requests.CreateProjectRequest;
import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(ProjectController.PROJECT_ENDPOINT)
@RestController
@RequiredArgsConstructor
public class ProjectController {

    public static final String PROJECT_ENDPOINT = "/projects";

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDTO> create(
            @AuthenticationPrincipal final User user,
            @RequestBody final CreateProjectRequest request) {
        ProjectDTO newProject = projectService.create(request, user);
        return ResponseEntity.ok(newProject);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ActiveProjectDTO> update(
            @PathVariable final Long id,
            @RequestBody final ActiveProjectDTO request) {
        ActiveProjectDTO project = projectService.update(id, request);

        return ResponseEntity.ok(project);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getProjectByUser(
            @AuthenticationPrincipal final User user,
            @RequestParam(defaultValue = "asc") final String sort,
            @RequestParam(defaultValue = "") final String q) {
        List<ProjectDTO> projectsList = projectService.getProjectsByUser(user, sort, q);

        return ResponseEntity.ok(projectsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActiveProjectDTO> getProjectById(@PathVariable final Long id) {
        ActiveProjectDTO activeProject = projectService.getProject(id);

        return ResponseEntity.ok(activeProject);
    }

    @PostMapping("/{projectId}/pin")
    public ResponseEntity<ProjectDTO> pinProject(
            @AuthenticationPrincipal final User user, @PathVariable final Long projectId) {
        ProjectDTO pinnedProject = projectService.pinProject(user.getId(), projectId);

        return ResponseEntity.ok(pinnedProject);
    }

    @PostMapping("/{projectId}/users")
    public ResponseEntity<String> addUserToProject(
            @PathVariable final Long projectId,
            @RequestBody final List<AddUserToProjectRequest> request) {
        projectService.addUserToProject(projectId, request);


        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable final Long projectId) {
        projectService.delete(projectId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{projectId}/users/{userId}")
    public ResponseEntity<String> deleteUserFromProject(
            @PathVariable final Long projectId,
            @PathVariable final Long userId) {
        projectService.deleteUserFromProject(projectId, userId);

        return ResponseEntity.ok().build();
    }
}
