package com.szte.saturn.repositories;

import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer> {
    Optional<Project> findById(Integer id);

    List<Project> findByOwnerId(Integer userId);

    @Query("SELECT p.users FROM Project p WHERE p.id = :projectId")
    Set<User> findUsersByProjectId(@Param("projectId") Integer projectId);

}
