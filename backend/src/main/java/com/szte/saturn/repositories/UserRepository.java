package com.szte.saturn.repositories;

import com.szte.saturn.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findUserById(int id);

    //Optional<User> findUserByProjectId(int id);
}
