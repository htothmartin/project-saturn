package com.szte.saturn.entities.rel_pinned_project;


import com.szte.saturn.entities.User;
import com.szte.saturn.entities.project.Project;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "pinned_projects")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@IdClass(RelPinnedProjectId.class)
@Data
public class RelPinnedProject {

    @Id
    @JoinColumn(name = "user_id", nullable = false)
    private Long userId;

    @Id
    @JoinColumn(name = "project_id", nullable = false)
    private Long projectId;
}
