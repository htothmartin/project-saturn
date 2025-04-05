package com.szte.saturn.services;

import com.szte.saturn.controllers.requests.CreateCommentDto;
import com.szte.saturn.controllers.requests.CreateTicketDto;
import com.szte.saturn.controllers.requests.UpdateTicketDto;
import com.szte.saturn.dtos.CommentDTO;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.entities.comment.Comment;
import com.szte.saturn.entities.project.Project;
import com.szte.saturn.entities.rel_user_projects.RelUserProjects;
import com.szte.saturn.entities.ticket.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.TicketStatus;
import com.szte.saturn.mapper.CommentMapper;
import com.szte.saturn.mapper.TicketMapper;
import com.szte.saturn.repositories.ProjectRepository;
import com.szte.saturn.repositories.TicketRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final ProjectService projectService;
    private final TicketMapper ticketMapper;
    private final UserService userService;
    private final CommentMapper commentMapper;
    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public Ticket getTicketByProjectAndTicketId(final Long projectId, final Long ticketId) {
        if (!ticketRepository.existsByProjectIdAndId(projectId, ticketId)) {
            throw new EntityNotFoundException("Ticket with id " + ticketId + " not found");
        }
        return ticketRepository.findByProjectIdAndId(projectId, ticketId);
    }

    @Transactional(readOnly = true)
    public List<Ticket> getTicketsByProjects(final Long projectId) {
        return ticketRepository.findByProjectId(projectId);
    }

    @Transactional
    public Ticket createTicket(final CreateTicketDto request, final User user) {
        Project project = projectService.getProjectById(request.getProjectId());
        Ticket ticket = new Ticket(request)
                .setReporter(user)
                .setStatus(TicketStatus.COMMITED)
                .setProject(project)
                .setId(project.getTicketCounter() + 1);

        project.incrementTicketCounter();
        projectRepository.save(project);
        return ticketRepository.save(ticket);
    }

    @Transactional
    public TicketDTO updateTicket(final Long projectId, final Long ticketId, final UpdateTicketDto request) {
        System.out.println(request.toString());
        Ticket ticket = getTicketByProjectAndTicketId(projectId, ticketId);
        if (request.getTitle() != null) {
            ticket.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            ticket.setDescription(request.getDescription());
        }
        if (request.getPriority() != null) {
            ticket.setPriority(request.getPriority());
        }
        if (request.getStatus() != null) {
            ticket.setStatus(request.getStatus());
        }
        if (request.getIssueType() != null) {
            ticket.setIssueType(request.getIssueType());
        }
        if (request.getAssigneeId() != null) {
            if (request.getAssigneeId() == -1) {
                ticket.setAssignee(null);
            } else {
                User newAssignee = userService.findUserById(request.getAssigneeId());
                ticket.setAssignee(newAssignee);
            }
        }

        Ticket updatedTicket = ticketRepository.save(ticket);

        return ticketMapper.toDto(updatedTicket);
    }

    @Transactional
    public CommentDTO createComment(final Long projectId, final Long ticketId, final CreateCommentDto request) {
        Ticket ticket = getTicketByProjectAndTicketId(projectId, ticketId);
        Project project = projectService.getProjectById(projectId);
        User author = project.getRelUserProjects().stream()
                .filter(relUserProjects -> relUserProjects.getUser().getId().equals(request.getAuthorId()))
                .findFirst().map(RelUserProjects::getUser).orElse(null);
        if (author == null) {
            System.out.println(request.getAuthorId());
            System.out.println(project.getOwner().getId());
            if (project.getOwner().getId().equals(request.getAuthorId())) {
                author = project.getOwner();
            }
            if (author == null) {
                throw new EntityNotFoundException("User not found");
            }
        }
        Comment comment = new Comment(request.getContent(), author, ticket);
        ticket.getComments().add(comment);
        Ticket savedTicket = ticketRepository.save(ticket);
        return commentMapper.toDTO(savedTicket.getComments().getFirst());
    }

    @Transactional(readOnly = true)
    public List<CommentDTO> getComments(final Long projectId, final Long ticketId) {
        Ticket ticket = getTicketByProjectAndTicketId(projectId, ticketId);
        return commentMapper.toDTO(ticket.getComments());
    }
}
