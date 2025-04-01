package com.szte.saturn.entities.rel_user_projects;

import com.szte.saturn.entities.User;
import com.szte.saturn.entities.project.Project;
import com.szte.saturn.enums.ProjectStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "user_projects")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@IdClass(RelUserProjectsId.class)
@Data
public class RelUserProjects {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private ProjectRole role;
}
