package com.szte.saturn.entities.rel_user_projects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelUserProjectsId implements Serializable {
    private long user;
    private long project;
}
