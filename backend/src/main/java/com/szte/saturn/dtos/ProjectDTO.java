package com.szte.saturn.dtos;

import com.szte.saturn.enums.ProjectStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProjectDTO {

    private Long id;

    private String name;

    private String description;

    private String key;

    private LocalDateTime createdAt;

    private UserDTO owner;

    private ProjectStatus status;

    private boolean pin;

    private Integer ticketCount;

    private Integer closedTickets;
}
