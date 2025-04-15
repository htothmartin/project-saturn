package com.szte.saturn.repositories;

import com.szte.saturn.entities.comment.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

}
