package com.szte.saturn.services;

import com.szte.saturn.dtos.CreateTicketDto;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.TicketStatus;
import com.szte.saturn.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final ProjectService projectService;

    public TicketService(TicketRepository ticketRepository, ProjectService projectService) {
        this.ticketRepository = ticketRepository;
        this.projectService = projectService;
    }

    public List<Ticket> getAllTickets(Integer projectId) {
        return ticketRepository.findByProjectId(projectId);
    }

    public Ticket createTicket(CreateTicketDto request, User user){

        Project project = projectService.getProject(request.getProjectId());

        Ticket ticket = new Ticket(request).setReporter(user).setTicketStatus(TicketStatus.COMMITED).setProject(project);

        return ticketRepository.save(ticket);
    }



}
