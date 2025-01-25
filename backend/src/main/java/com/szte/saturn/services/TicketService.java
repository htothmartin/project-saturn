package com.szte.saturn.services;

import com.szte.saturn.controllers.dtos.CreateTicketDto;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.TicketStatus;
import com.szte.saturn.repositories.ProjectRepository;
import com.szte.saturn.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final ProjectRepository projectRepository;

    public TicketService(TicketRepository ticketRepository, ProjectRepository projectRepository) {
        this.ticketRepository = ticketRepository;
        this.projectRepository = projectRepository;
    }

    public List<Ticket> getAllTickets(Long projectId) {
        return ticketRepository.findByProjectId(projectId);
    }

    public Ticket createTicket(CreateTicketDto request, User user){

        Project project = projectRepository.findById(request.getProjectId()).orElseThrow();

        Ticket ticket = new Ticket(request).setReporter(user).setStatus(TicketStatus.COMMITED).setProject(project);

        return ticketRepository.save(ticket);
    }



}
