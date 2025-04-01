package com.szte.saturn.repositories;

import com.szte.saturn.entities.rel_pinned_project.RelPinnedProject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RelPinnedProjectRepository extends CrudRepository<RelPinnedProject, Long> {

    boolean existsByUserIdAndProjectId(Long userId, Long projectId);

    Optional<RelPinnedProject> findByUserIdAndProjectId(Long userId, Long projectId);

}
