package com.szte.saturn.controllers.requests;

import com.szte.saturn.enums.IssueType;
import com.szte.saturn.enums.TicketPriority;
import com.szte.saturn.enums.TicketStatus;
import lombok.Data;

@Data
public class UpdateTicketDto {
    private String title;
    private String description;
    private TicketPriority priority;
    private TicketStatus status;
    private IssueType issueType;
    private Long assigneeId;
    private Long sprintId;
}
