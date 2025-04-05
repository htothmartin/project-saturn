package com.szte.saturn.dtos;

import com.szte.saturn.entities.rel_user_projects.ProjectRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectUsersDTO extends UserDTO {
    private ProjectRole role;
}
