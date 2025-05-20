package com.szte.saturn.controllers;


import com.szte.saturn.dtos.SprintDTO;
import com.szte.saturn.services.SprintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(SprintController.SPRINT_ENDPOINT)
@RestController
@RequiredArgsConstructor
public class SprintController {

    public static final String SPRINT_ENDPOINT = "/sprints";

    private final SprintService sprintService;

    @PostMapping
    public ResponseEntity<SprintDTO> create(
            @RequestBody final SprintDTO sprintDTO) {
        return ResponseEntity.ok(sprintService.create(sprintDTO));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable final Long id) {
        sprintService.delete(id);
        return ResponseEntity.ok().build();
    }



}
