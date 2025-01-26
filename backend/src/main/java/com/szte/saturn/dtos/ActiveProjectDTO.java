package com.szte.saturn.dtos;

import com.szte.saturn.enums.ProjectStatus;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
public class ActiveProjectDTO {

    private Long id;

    private String name;

    private String description;

    private Date createdAt;

    private UserDTO owner;

    private ProjectStatus projectStatus;

    private List<TicketDTO> tickets;

    private Set<UserDTO> users;
}
