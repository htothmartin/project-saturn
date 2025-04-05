package com.szte.saturn.entities.comment;

import com.szte.saturn.entities.User;
import com.szte.saturn.entities.ticket.Ticket;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "comments")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
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

    public Comment(final String content, final User author, final Ticket ticket) {
        this.content = content;
        this.author = author;
        this.ticket = ticket;
    }

}
