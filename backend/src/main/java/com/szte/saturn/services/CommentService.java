package com.szte.saturn.services;

import com.szte.saturn.controllers.requests.CreateCommentDto;
import com.szte.saturn.dtos.CommentDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.entities.comment.Comment;
import com.szte.saturn.entities.project.Project;
import com.szte.saturn.entities.rel_user_projects.RelUserProjects;
import com.szte.saturn.entities.ticket.Ticket;
import com.szte.saturn.exceptions.ApiException;
import com.szte.saturn.mapper.CommentMapper;
import com.szte.saturn.repositories.CommentRepository;
import com.szte.saturn.websocket.WebsocketService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final WebsocketService websocketService;
    private final CommentMapper commentMapper;
    private final TicketService ticketService;

    @Transactional
    public CommentDTO create(final Long projectId,
                             final Long ticketId,
                             final CreateCommentDto request) {
        Ticket ticket = ticketService.getTicketByProjectAndTicketId(projectId, ticketId);
        Project project = ticket.getProject();
        User author = project.getRelUserProjects().stream()
                .filter(relUserProjects -> relUserProjects.getUser().getId().equals(request.getAuthorId()))
                .findFirst().map(RelUserProjects::getUser).orElse(null);

        if (author == null) {
            throw ApiException.builder()
                    .message("User not found")
                    .status(HttpStatus.NOT_FOUND.value())
                    .build();
        }

        Comment comment = commentRepository.save(new Comment(request.getContent(), author, ticket));

        CommentDTO commentDTO = commentMapper.toDTO(comment);

        if (ticket.getAssignee() != null && !Objects.equals(author.getId(), ticket.getAssignee().getId())) {
            websocketService.notifyUser(ticket.getAssignee(), commentDTO);
        }
        return commentDTO;
    }


}
