package com.szte.saturn.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SprintDTO {
    private long id;
    private long projectId;
    private String name;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
