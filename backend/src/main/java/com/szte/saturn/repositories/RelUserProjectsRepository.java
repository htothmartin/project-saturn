package com.szte.saturn.repositories;

import com.szte.saturn.entities.project.Project;
import com.szte.saturn.entities.rel_user_projects.RelUserProjects;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelUserProjectsRepository extends CrudRepository<RelUserProjects, Long> {

    boolean existsByUserIdAndProjectId(Long userId, Long projectId);

    @Query("SELECT r.project FROM RelUserProjects r "
            + "WHERE r.user.id = :userId AND LOWER(r.project.name) "
            + "LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Project> findProjectsByUserId(
            @Param("userId") Long userId,
            @Param("name") String name,
            Sort sort);

    void deleteByUserIdAndProjectId(Long userId, Long projectId);
}
