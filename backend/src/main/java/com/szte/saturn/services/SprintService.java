package com.szte.saturn.services;

import com.szte.saturn.dtos.SprintDTO;
import com.szte.saturn.entities.Sprint;
import com.szte.saturn.entities.project.Project;
import com.szte.saturn.exceptions.ApiException;
import com.szte.saturn.mapper.SprintMapper;
import com.szte.saturn.repositories.SprintRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SprintService {

    private final ProjectService projectService;
    private final SprintRepository sprintRepository;
    private final SprintMapper sprintMapper;

    public Sprint getById(final Long id) {
        return sprintRepository.findById(id).
                orElseThrow(() -> ApiException.builder()
                        .message("Sprint not found")
                        .status(HttpStatus.NOT_FOUND.value())
                        .build());
    }

    @Transactional
    public SprintDTO create(final SprintDTO request) {
        Project project = projectService.getProjectById(request.getProjectId());
        Sprint sprint = new Sprint(request.getName(), request.getStartDate(), request.getEndDate(), project);

        sprint = sprintRepository.save(sprint);

        return sprintMapper.toDTO(sprint);
    }

    public void delete(Long id) {
        sprintRepository.deleteById(id);
    }
}
