package com.szte.saturn.repositories;

import com.szte.saturn.entities.Ticket;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TicketRepository extends CrudRepository<Ticket, String> {

    Optional<Ticket> findById(Integer ticketId);

    List<Ticket> findByProjectId(Integer projectId);
}
