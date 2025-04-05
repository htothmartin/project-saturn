package com.szte.saturn.dtos;

import com.szte.saturn.enums.ProjectStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import lombok.Data;


@Data
public class ActiveProjectDTO {

    private Long id;

    private String name;

    private String description;

    private String key;

    private LocalDateTime createdAt;

    private UserDTO owner;

    private ProjectStatus projectStatus;

    private List<TicketDTO> tickets;

    private Set<ProjectUsersDTO> users;
}
