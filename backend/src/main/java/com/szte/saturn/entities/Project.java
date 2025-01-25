package com.szte.saturn.entities;

import com.szte.saturn.controllers.dtos.CreateProjectDto;
import com.szte.saturn.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name="projects")
@Entity
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ProjectStatus status;

    @Column(name = "created_at")
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Ticket> tickets;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Sprint> sprints;

    @ManyToMany(mappedBy = "projects")
    private Set<User> users = new HashSet<>();

    @ManyToMany(mappedBy = "pinnedProjects")
    private Set<User> pinnedProjects = new HashSet<>();


    public Project(CreateProjectDto request){
        this.name = request.getName();
        this.description = request.getDescription();
    }

}
