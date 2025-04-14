package com.szte.saturn.controllers;


import com.szte.saturn.dtos.SprintDTO;
import com.szte.saturn.services.SprintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/sprints")
@RestController
@RequiredArgsConstructor
public class SprintController {

    private final SprintService sprintService;

    @PostMapping
    public ResponseEntity<SprintDTO> create(
            @RequestBody final SprintDTO sprintDTO) {
        return ResponseEntity.ok(sprintService.create(sprintDTO));
    }



}
