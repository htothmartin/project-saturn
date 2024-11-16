package com.szte.saturn.entities;

import com.szte.saturn.controllers.dtos.CreateTicketDto;
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

import java.util.Date;

@Table(name="tickets")
@Entity
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class Ticket {

    public Ticket(CreateTicketDto ticketDto) {
        this.title = ticketDto.getTitle();
        this.description = ticketDto.getDescription();
        this.ticketPriority = ticketDto.getPriority();
        this.issueType = ticketDto.getType();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Column
    private String title;

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus ticketStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueType issueType;

    @CreationTimestamp
    @Column(nullable = false)
    private Date createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Date updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketPriority ticketPriority;


}
