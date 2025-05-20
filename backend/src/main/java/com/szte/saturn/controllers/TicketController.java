package com.szte.saturn.controllers;

import com.szte.saturn.controllers.requests.CreateCommentDto;
import com.szte.saturn.controllers.requests.CreateTicketDto;
import com.szte.saturn.controllers.requests.UpdateTicketDto;
import com.szte.saturn.dtos.CommentDTO;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.entities.ticket.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.services.CommentService;
import com.szte.saturn.services.TicketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(TicketController.TICKET_ENDPOINT)
@RestController
@RequiredArgsConstructor
@Slf4j
public class TicketController {

    public static final String TICKET_ENDPOINT = "/projects/{projectId}/tickets";

    private final TicketService ticketService;
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody final CreateTicketDto addTicketDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        Ticket ticket = ticketService.createTicket(addTicketDto, currentUser);

        return ResponseEntity.ok(ticket);
    }

    @PatchMapping("/{ticketId}")
    public ResponseEntity<TicketDTO> updateTicket(
            @PathVariable final Long projectId,
            @PathVariable final Long ticketId,
            @RequestBody final UpdateTicketDto updateTicketDto) {

        TicketDTO updatedTicket = ticketService.updateTicket(projectId, ticketId, updateTicketDto);

        return ResponseEntity.ok(updatedTicket);
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllByProjectsTickets(
            @PathVariable final Long projectId) {
        List<Ticket> tickets = ticketService.getTicketsByProjects(projectId);

        return ResponseEntity.ok(tickets);
    }

    //Comments
    @PostMapping("/{ticketId}/comments")
    public ResponseEntity<CommentDTO> addCommentToProject(
            @PathVariable final Long projectId,
            @PathVariable final Long ticketId,
            @RequestBody final CreateCommentDto commentDTO) {

        CommentDTO comment = commentService.create(projectId, ticketId, commentDTO);

        return ResponseEntity.ok(comment);
    }

    @GetMapping("/{ticketId}/comments")
    public ResponseEntity<List<CommentDTO>> getTicket(
            @PathVariable final Long projectId,
            @PathVariable final Long ticketId) {
        List<CommentDTO> comments = ticketService.getComments(projectId, ticketId);

        return ResponseEntity.ok(comments);
    }
}
