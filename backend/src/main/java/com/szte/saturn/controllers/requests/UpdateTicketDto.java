package com.szte.saturn.controllers.requests;

import com.szte.saturn.enums.IssueType;
import com.szte.saturn.enums.TicketPriority;
import com.szte.saturn.enums.TicketStatus;
import lombok.Data;

@Data
public class UpdateTicketDto {

    String title;

    String description;

    TicketPriority priority;

    TicketStatus status;

    IssueType issueType;

    Long assigneeId;
}
