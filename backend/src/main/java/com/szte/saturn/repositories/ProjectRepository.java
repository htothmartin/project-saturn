package com.szte.saturn.repositories;

import com.szte.saturn.entities.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer> {
    Optional<Project> findById(Integer id);

}
