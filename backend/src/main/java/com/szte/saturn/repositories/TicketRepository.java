package com.szte.saturn.repositories;

import com.szte.saturn.entities.ticket.Ticket;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TicketRepository extends CrudRepository<Ticket, Long> {
    Ticket findByProjectIdAndId(Long projectId, Long id);

    List<Ticket> findByProjectId(Long projectId);

    boolean existsByProjectIdAndId(Long projectId, Long id);
}
