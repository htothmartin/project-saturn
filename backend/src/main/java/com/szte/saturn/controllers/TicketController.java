package com.szte.saturn.controllers;

import com.szte.saturn.entities.Ticket;
import com.szte.saturn.services.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/tickets")
@RestController
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    public ResponseEntity<List<Ticket>> getAllByProjectsTickets(@PathVariable Integer projectId ) {
        List<Ticket> tickets = ticketService.getAllTickets(projectId);

        return ResponseEntity.ok(tickets);
    }
}
