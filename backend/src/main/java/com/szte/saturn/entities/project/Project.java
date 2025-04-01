package com.szte.saturn.entities.project;

import com.szte.saturn.controllers.requests.CreateProjectRequest;
import com.szte.saturn.entities.Sprint;
import com.szte.saturn.entities.rel_pinned_project.RelPinnedProject;
import com.szte.saturn.entities.ticket.Ticket;
import com.szte.saturn.entities.User;
import com.szte.saturn.entities.rel_user_projects.RelUserProjects;
import com.szte.saturn.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@Table(name="projects")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ProjectStatus status;

    @Column(name = "key", nullable = false)
    private String key;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "ticket_counter")
    private Long ticketCounter;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Ticket> tickets = new HashSet<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Sprint> sprints = new HashSet<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RelUserProjects> relUserProjects = new ArrayList<>();

    @OneToMany(mappedBy = "projectId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RelPinnedProject> relPinnedProjects = new ArrayList<>();

    public void incrementTicketCounter() {
        ticketCounter++;
    }

    public Project(CreateProjectRequest request){
        this.name = request.getName();
        this.key = request.getKey();
        this.description = request.getDescription();
        this.status = ProjectStatus.ACTIVE;
    }

}
