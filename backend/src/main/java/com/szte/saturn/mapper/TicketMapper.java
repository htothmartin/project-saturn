package com.szte.saturn.mapper;

import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.ticket.Ticket;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TicketMapper {

    private final ModelMapper modelMapper;
    private final UserMapper userMapper;

    public TicketDTO toDto(final Ticket ticket) {

        TicketDTO ticketDTO = modelMapper.map(ticket, TicketDTO.class);

        if (ticket.getAssignee() != null) {
            UserDTO assignee = userMapper.toDto(ticket.getAssignee());
            ticketDTO.setAssignee(assignee);
        }

        if (ticket.getReporter() != null) {
            UserDTO reporter = userMapper.toDto(ticket.getReporter());
            ticketDTO.setReporter(reporter);
        }


        return ticketDTO;
    }

}
