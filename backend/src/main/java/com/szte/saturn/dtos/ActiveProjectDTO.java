package com.szte.saturn.dtos;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class ActiveProjectDTO {

    private ProjectDTO project;

    private List<TicketDTO> tickets;

    private Set<UserDTO> users;
}
