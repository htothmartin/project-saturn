package com.szte.saturn.controllers.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProjectRequest {
    private String name;
    private String key;
    private String description;
}
