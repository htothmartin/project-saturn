package com.szte.saturn.mapper;

import com.szte.saturn.dtos.CommentDTO;
import com.szte.saturn.entities.comment.Comment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CommentMapper {

    @Autowired
    private ModelMapper modelMapper;


    public CommentDTO toDTO(Comment comment) {
        return modelMapper.map(comment, CommentDTO.class);
    }

    public List<CommentDTO> toDTO(List<Comment> comments) {
        return comments.stream().map(this::toDTO).collect(Collectors.toList());
    }

}
