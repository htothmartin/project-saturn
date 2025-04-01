package com.szte.saturn.entities.rel_pinned_project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelPinnedProjectId implements Serializable {
    private long projectId;
    private long userId;
}
