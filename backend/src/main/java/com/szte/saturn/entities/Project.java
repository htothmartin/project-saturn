package com.szte.saturn.entities;

import com.szte.saturn.dtos.CreateProjectDto;
import com.szte.saturn.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;

@Table(name="projects")
@Entity
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private String imageUrl;

    @CreationTimestamp
    @Column(nullable = false)
    private String createdAt;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus projectStatus;

    public Project(CreateProjectDto request){
        this.name = request.getName();
        this.description = request.getDescription();
        this.imageUrl = request.getImageUrl();
    }

}
