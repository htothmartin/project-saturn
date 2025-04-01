package com.szte.saturn.mapper;

import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.project.Project;
import com.szte.saturn.entities.rel_user_projects.RelUserProjects;
import com.szte.saturn.entities.ticket.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.TicketStatus;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private TicketMapper ticketMapper;


    public ProjectDTO toDto(Project project, Long userId, boolean isPinned) {
        ProjectDTO projectDTO = modelMapper.map(project, ProjectDTO.class);
        Integer closedTickets = project.getTickets().stream().filter(ticket -> TicketStatus.CLOSED.equals(ticket.getStatus())).toList().size();

        projectDTO.setClosedTickets(closedTickets);
        projectDTO.setTicketCount(project.getTickets().size());
        projectDTO.setPin(isPinned);
        return projectDTO;
    }

    public ActiveProjectDTO toActiveProjectDTO(Project project) {
        ActiveProjectDTO activeProjectDTO = modelMapper.map(project, ActiveProjectDTO.class);
        activeProjectDTO.setCreatedAt(project.getCreatedAt());

        List<TicketDTO> tickets = new ArrayList<>();
        for (Ticket ticket : project.getTickets()) {
            tickets.add(ticketMapper.toDto(ticket));
        }

        activeProjectDTO.setTickets(tickets);

        UserDTO owner = userMapper.toDto(project.getOwner());
        activeProjectDTO.setOwner(owner);

        Set<UserDTO> users = new HashSet<>();
        project.getRelUserProjects().stream().map(relUserProjects -> userMapper.toDto(relUserProjects.getUser())).forEach(users::add);

        activeProjectDTO.setUsers(users);

        return activeProjectDTO;
    }


}
