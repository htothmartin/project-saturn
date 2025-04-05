package com.szte.saturn.mapper;

import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.ticket.Ticket;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserMapper userMapper;

    public TicketDTO toDto(final Ticket ticket) {

        TicketDTO ticketDTO = modelMapper.map(ticket, TicketDTO.class);

        if (ticket.getAssignee() != null) {
            UserDTO assigne = userMapper.toDto(ticket.getAssignee());
            ticketDTO.setAssignee(assigne);
        }

        if (ticket.getReporter() != null) {
            UserDTO reporter = userMapper.toDto(ticket.getReporter());
            ticketDTO.setReporter(reporter);
        }

        return ticketDTO;
    }

}
