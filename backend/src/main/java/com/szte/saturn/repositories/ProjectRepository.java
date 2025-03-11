package com.szte.saturn.repositories;

import com.szte.saturn.dtos.ProjectDTO;
import com.szte.saturn.entities.Project;
import com.szte.saturn.entities.User;
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

    Optional<Project> findById(Long id);

    /*@Query(value = "SELECT * FROM projects\n" +
           "    LEFT JOIN user_projects ON projects.id = user_projects.project_id\n" +
           "    LEFT JOIN pinned_projects ON projects.id = pinned_projects.project_id\n" +
           "         WHERE projects.owner_id = :userId OR user_projects.user_id = :userId", nativeQuery = true)*/
    @Query("SELECT p FROM Project p " +
            "LEFT JOIN p.users pu " +
            "LEFT JOIN p.pinnedProjects pp " +
            "WHERE (pu.id = :userId OR pp.id = :userId OR p.owner.id = :userId)" +
            "AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Project> findProjectsByUser(@Param("userId") Long userId, @Param("name") String name, Sort sort);

    @Query("SELECT p.users FROM Project p")
    Set<User> findUsersByProjectId(@Param("projectId") Long projectId);

    @Query(value = "SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END " +
            "FROM pinned_projects p WHERE p.project_id = :projectId AND p.user_id = :userId", nativeQuery = true)
    boolean findByOwnerId(@Param("projectId") Integer projectId, @Param("userId") Integer userId);

}
