package com.szte.saturn.repositories;

import com.szte.saturn.entities.project.Project;
import com.szte.saturn.entities.User;
import jakarta.annotation.Nonnull;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    @NotNull Optional<Project> findById(@Nonnull Long id);

    boolean existsById(@Nonnull Long id);

    /*@Query(value = "SELECT * FROM projects\n" +
           "    LEFT JOIN user_projects ON projects.id = user_projects.project_id\n" +
           "    LEFT JOIN pinned_projects ON projects.id = pinned_projects.project_id\n" +
           "         WHERE projects.owner_id = :userId OR user_projects.user_id = :userId", nativeQuery = true)*/
    @Query("SELECT p FROM Project p " +
            "LEFT JOIN p.relUserProjects relUp " +
            "WHERE (relUp.user IS NOT NULL and relUp.user.id = :userId) " +
            "AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Project> findProjectsByUser(@Param("userId") Long userId, @Param("name") String name, Sort sort);

}
