package com.szte.saturn.controllers.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProjectDto {

    private String name;

    private String description;

    private String imageUrl;
}
