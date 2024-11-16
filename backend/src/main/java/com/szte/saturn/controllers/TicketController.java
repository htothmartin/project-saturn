package com.szte.saturn.controllers;

import com.szte.saturn.controllers.dtos.CreateTicketDto;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.services.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/tickets")
@RestController
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> create(@RequestBody CreateTicketDto addTicketDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        Ticket ticket = ticketService.createTicket(addTicketDto, currentUser);

        return ResponseEntity.ok(ticket);
    }

    @GetMapping("/")
    public ResponseEntity<List<Ticket>> getAllByProjectsTickets(@PathVariable Integer projectId ) {
        List<Ticket> tickets = ticketService.getAllTickets(projectId);

        return ResponseEntity.ok(tickets);
    }
}
