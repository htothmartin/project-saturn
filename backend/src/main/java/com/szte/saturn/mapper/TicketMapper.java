package com.szte.saturn.mapper;

import com.szte.saturn.dtos.TicketDTO;
import com.szte.saturn.entities.Ticket;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {

    @Autowired
    private ModelMapper modelMapper;

    public TicketDTO toDto(Ticket ticket) {
        return modelMapper.map(ticket, TicketDTO.class);
    }

}
