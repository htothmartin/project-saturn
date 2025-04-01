package com.szte.saturn.controllers.requests;

import com.szte.saturn.entities.rel_user_projects.ProjectRole;
import lombok.Data;

@Data
public class AddUserToProjectRequest {
    private Long userId;
    private ProjectRole role;
}
