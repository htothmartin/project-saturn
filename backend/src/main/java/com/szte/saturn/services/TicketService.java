package com.szte.saturn.services;

import com.szte.saturn.entities.Ticket;
import com.szte.saturn.repositories.TicketRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public List<Ticket> getAllTickets(Integer projectId) {
        return ticketRepository.findByProjectId(projectId);
    }


}
