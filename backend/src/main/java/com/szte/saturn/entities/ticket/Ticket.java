package com.szte.saturn.entities.ticket;

import com.szte.saturn.controllers.requests.CreateTicketDto;
import com.szte.saturn.entities.User;
import com.szte.saturn.entities.comment.Comment;
import com.szte.saturn.entities.project.Project;
import com.szte.saturn.enums.IssueType;
import com.szte.saturn.enums.TicketPriority;
import com.szte.saturn.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name="tickets")
@Entity
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@IdClass(TicketId.class)
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", length = 150)
    private String title;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketPriority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueType issueType;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @ManyToOne
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;

    @Id
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();


    public Ticket(CreateTicketDto ticketDto) {
        this.title = ticketDto.getTitle();
        this.description = ticketDto.getDescription();
        this.priority = ticketDto.getPriority();
        this.issueType = ticketDto.getType();
    }


}
