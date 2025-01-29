package com.szte.saturn.services;

import com.szte.saturn.controllers.dtos.CreateTicketDto;
import com.szte.saturn.controllers.dtos.UpdateTicketDto;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.TicketStatus;
import com.szte.saturn.mapper.TicketMapper;
import com.szte.saturn.repositories.TicketRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final ProjectService projectService;
    private final TicketMapper ticketMapper;
    private final UserService userService;

    public TicketService(TicketRepository ticketRepository, ProjectService projectService, TicketMapper ticketMapper, UserService userService) {
        this.ticketRepository = ticketRepository;
        this.projectService = projectService;
        this.ticketMapper = ticketMapper;
        this.userService = userService;
    }
    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Ticket not found"));
    }

    public List<Ticket> getTicketsByProjects(Long projectId) {
        return ticketRepository.findByProjectId(projectId);
    }

    public Ticket createTicket(CreateTicketDto request, User user){

        Project project = projectService.getProjectById(request.getProjectId());

        Ticket ticket = new Ticket(request).setReporter(user).setStatus(TicketStatus.COMMITED).setProject(project);

        return ticketRepository.save(ticket);
    }

    public TicketDTO updateTicket(Long projectId, Long ticketId, UpdateTicketDto request){
        System.out.println(request.toString());
        Ticket ticket = getTicketById(ticketId);
        if(request.getTitle() != null){
            ticket.setTitle(request.getTitle());
        } if(request.getDescription() != null){
            ticket.setDescription(request.getDescription());
        } if(request.getPriority() != null){
            ticket.setPriority(request.getPriority());
        } if(request.getStatus() != null){
            ticket.setStatus(request.getStatus());
        } if(request.getAssigneeId() != null){
            User newAssignee = userService.findUserById(request.getAssigneeId());
            System.out.println(newAssignee.toString());
            ticket.setAssignee(newAssignee);
        }

        Ticket updatedTicket = ticketRepository.save(ticket);

        return ticketMapper.toDto(updatedTicket);
    }



}
