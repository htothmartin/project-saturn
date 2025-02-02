package com.szte.saturn.repositories;

import com.szte.saturn.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findUserById(Long id);

    @Query("SELECT u FROM User u WHERE u.id != :currentUserId AND u.id != :ownerId AND u.id NOT IN (SELECT user.id FROM Project p JOIN p.users user WHERE p.id = :projectId)")
    List<User> findUsersNotInProject(@Param("projectId") Long projectId, @Param("ownerId") Long ownerId, @Param("currentUserId") Long currentUserId);
}
