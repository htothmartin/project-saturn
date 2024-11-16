package com.szte.saturn.mapper;

import com.szte.saturn.dtos.ActiveProjectDTO;
import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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


    public ProjectDTO toDto(Project project) {
        return modelMapper.map(project, ProjectDTO.class);
    }

    public List<ProjectDTO> toListDto(List<Project> projects) {
        return projects.stream().map(this::toDto).collect(Collectors.toList());
    }

    public ActiveProjectDTO toActiveProjectDTO(Project project, List<Ticket> tickets, Set<User> users) {
        ActiveProjectDTO activeProjectDTO = new ActiveProjectDTO();
        activeProjectDTO.setProject(toDto(project));

        List<TicketDTO> ticketDTOS = tickets.stream().map(ticketMapper::toDto).collect(Collectors.toList());
        Set<UserDTO> userDTOS = users.stream().map(userMapper::toDto).collect(Collectors.toSet());

        activeProjectDTO.setTickets(ticketDTOS);
        activeProjectDTO.setUsers(userDTOS);

        return activeProjectDTO;
    }


}
