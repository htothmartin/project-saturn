package com.szte.saturn.dtos;

import com.szte.saturn.enums.IssueType;
import com.szte.saturn.enums.TicketPriority;
import com.szte.saturn.enums.TicketStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class TicketDTO {
    private Integer id;
    private String title;
    private String description;
    private UserDTO assignee;
    private UserDTO reporter;
    private TicketStatus status;
    private IssueType issueType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private TicketPriority ticketPriority;
}
