package com.szte.saturn.controllers;

import com.szte.saturn.controllers.dtos.CreateTicketDto;
import com.szte.saturn.controllers.dtos.UpdateTicketDto;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.services.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/projects/{projectId}/tickets")
@RestController
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody CreateTicketDto addTicketDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        Ticket ticket = ticketService.createTicket(addTicketDto, currentUser);

        return ResponseEntity.ok(ticket);
    }

    @PatchMapping("/{ticketId}")
    public ResponseEntity<TicketDTO> updateTicket(@PathVariable Long projectId,
                                                  @PathVariable Long ticketId,
                                                  @RequestBody UpdateTicketDto updateTicketDto) {

        TicketDTO updatedTicket = ticketService.updateTicket(projectId, ticketId, updateTicketDto);

        return ResponseEntity.ok(updatedTicket);
    }

    @GetMapping("")
    public ResponseEntity<List<Ticket>> getAllByProjectsTickets(@PathVariable Long projectId ) {
        List<Ticket> tickets = ticketService.getTicketsByProjects(projectId);

        return ResponseEntity.ok(tickets);
    }
}
