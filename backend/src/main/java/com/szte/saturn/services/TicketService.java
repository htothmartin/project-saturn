package com.szte.saturn.services;

import com.szte.saturn.controllers.dtos.CreateCommentDto;
import com.szte.saturn.controllers.dtos.CreateTicketDto;
import com.szte.saturn.controllers.dtos.UpdateTicketDto;
import com.szte.saturn.dtos.CommentDTO;
import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.entities.Comment;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.TicketStatus;
import com.szte.saturn.mapper.CommentMapper;
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
    private final CommentMapper commentMapper;

    public TicketService(TicketRepository ticketRepository, ProjectService projectService, TicketMapper ticketMapper, UserService userService, CommentMapper commentMapper) {
        this.ticketRepository = ticketRepository;
        this.projectService = projectService;
        this.ticketMapper = ticketMapper;
        this.userService = userService;
        this.commentMapper = commentMapper;
    }
    public Ticket getTicketById(Long ticketId) {
        return ticketRepository.findById(ticketId).orElseThrow(() -> new EntityNotFoundException("Ticket not found"));
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
        } if(request.getIssueType() != null){
            ticket.setIssueType(request.getIssueType());
        } if(request.getAssigneeId() != null){
            if(request.getAssigneeId() == -1){
                ticket.setAssignee(null);
            } else {
                User newAssignee = userService.findUserById(request.getAssigneeId());
                ticket.setAssignee(newAssignee);
            }
        }

        Ticket updatedTicket = ticketRepository.save(ticket);

        return ticketMapper.toDto(updatedTicket);
    }

    public CommentDTO createComment(Long projectId, Long ticketId, CreateCommentDto request){
        Ticket ticket = getTicketById(ticketId);
        Project project = projectService.getProjectById(projectId);
        User author = project.getUsers().stream()
                .filter(user -> user.getId().equals(request.getAuthorId()))
                .findFirst().orElse(null);
        if(author == null){
            System.out.println(request.getAuthorId());
            System.out.println(project.getOwner().getId());
            if(project.getOwner().getId().equals(request.getAuthorId()))
            author = project.getOwner();
            if(author == null){
                throw new EntityNotFoundException("User not found");
            }
        }
        Comment comment = new Comment(request.getContent(), author, ticket);
        ticket.getComments().add(comment);
        Ticket savedTicket = ticketRepository.save(ticket);
        return commentMapper.toDTO(savedTicket.getComments().getFirst());
    }


    public List<CommentDTO> getComments(Long ticketId) {
        Ticket ticket = getTicketById(ticketId);
        return commentMapper.toDTO(ticket.getComments());
    }
}
