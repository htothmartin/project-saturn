package com.szte.saturn.mapper;

import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.dtos.ProjectUsersDTO;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.project.Project;
import com.szte.saturn.entities.ticket.Ticket;
import com.szte.saturn.enums.TicketStatus;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private TicketMapper ticketMapper;


    public ProjectDTO toDto(final Project project, final boolean isPinned) {
        ProjectDTO projectDTO = modelMapper.map(project, ProjectDTO.class);
        Integer closedTickets = project.getTickets()
                .stream()
                .filter(ticket -> TicketStatus.CLOSED.equals(ticket.getStatus()))
                .toList().size();

        projectDTO.setClosedTickets(closedTickets);
        projectDTO.setTicketCount(project.getTickets().size());
        projectDTO.setPin(isPinned);
        return projectDTO;
    }

    public ActiveProjectDTO toActiveProjectDTO(final Project project) {
        ActiveProjectDTO activeProjectDTO = modelMapper.map(project, ActiveProjectDTO.class);
        activeProjectDTO.setCreatedAt(project.getCreatedAt());

        List<TicketDTO> tickets = new ArrayList<>();
        for (Ticket ticket : project.getTickets()) {
            tickets.add(ticketMapper.toDto(ticket));
        }

        activeProjectDTO.setTickets(tickets);

        UserDTO owner = userMapper.toDto(project.getOwner());
        activeProjectDTO.setOwner(owner);

        Set<ProjectUsersDTO> users = project.getRelUserProjects().stream()
                .map(rel -> userMapper.toProjectUsersDTO(rel.getUser(), rel.getRole()))
                .collect(Collectors.toSet());
        activeProjectDTO.setUsers(users);

        return activeProjectDTO;
    }


}
