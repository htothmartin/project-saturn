package com.szte.saturn.entities.comment;

import com.szte.saturn.entities.project.Project;
import com.szte.saturn.entities.ticket.Ticket;
import com.szte.saturn.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name="comments")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="content")
    private String content;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "ticket_id", referencedColumnName = "id", nullable = false),
            @JoinColumn(name = "project_id", referencedColumnName = "project_id", nullable = false)
    })
    private Ticket ticket;

    public Comment(String content, User author, Ticket ticket) {
        this.content = content;
        this.author = author;
        this.ticket = ticket;
    }

}
