package com.szte.saturn.dtos;

import com.szte.saturn.enums.ProjectStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class ProjectDTO {

    private Long id;

    private String name;

    private String description;

    private LocalDateTime createdAt;

    private UserDTO owner;

    private ProjectStatus projectStatus;

    private boolean pin;

    private Integer ticketCount;

    private Integer closedTickets;
}
