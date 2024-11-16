package com.szte.saturn.dtos;

import com.szte.saturn.enums.ProjectStatus;
import lombok.Data;

import java.util.Date;

@Data
public class ProjectDTO {

    private Integer id;

    private String name;

    private String description;

    private String imageUrl;

    private Date createdAt;

    private UserDTO owner;

    private ProjectStatus projectStatus;
}
