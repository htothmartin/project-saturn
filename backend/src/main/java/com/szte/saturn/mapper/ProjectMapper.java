package com.szte.saturn.mapper;

import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.TicketStatus;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.print.attribute.standard.Destination;
import java.util.LinkedList;
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


    public ProjectDTO toDto(Project project, Long userId) {
        ProjectDTO projectDTO = modelMapper.map(project, ProjectDTO.class);
        boolean isPinned = project.getPinnedProjects().stream().anyMatch(user -> user.getId().equals(userId));
        Integer closedTickets = project.getTickets().stream().filter(ticket -> TicketStatus.CLOSED.equals(ticket.getStatus())).toList().size();

        projectDTO.setClosedTickets(closedTickets);
        projectDTO.setTicketCount(project.getTickets().size());
        projectDTO.setPin(isPinned);
        return projectDTO;
    }

    public List<ProjectDTO> toListDto(List<Project> projects, Long userId) {
        return projects.stream().map(project -> toDto(project, userId)).collect(Collectors.toList());
    }

    public ActiveProjectDTO toActiveProjectDTO(Project project, List<Ticket> tickets, Set<User> users, Long userId) {
        ActiveProjectDTO activeProjectDTO = new ActiveProjectDTO();
        activeProjectDTO.setProject(toDto(project, userId));

        List<TicketDTO> ticketDTOS = tickets.stream().map(ticketMapper::toDto).collect(Collectors.toList());
        Set<UserDTO> userDTOS = users.stream().map(userMapper::toDto).collect(Collectors.toSet());

        activeProjectDTO.setTickets(ticketDTOS);
        activeProjectDTO.setUsers(userDTOS);

        return activeProjectDTO;
    }


}
