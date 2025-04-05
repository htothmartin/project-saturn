package com.szte.saturn.entities.rel_pinned_project;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
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
