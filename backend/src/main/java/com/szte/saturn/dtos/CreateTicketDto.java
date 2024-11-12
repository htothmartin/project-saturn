package com.szte.saturn.dtos;

import com.szte.saturn.enums.IssueType;
import com.szte.saturn.enums.TicketPriority;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTicketDto {

    private String title;

    private String description;

    private TicketPriority priority;

    private IssueType type;

    private Integer projectId;
}
