package com.szte.saturn.mapper;

import com.szte.saturn.dtos.CommentDTO;
import com.szte.saturn.entities.comment.Comment;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CommentMapper {

    private final ModelMapper modelMapper;

    public CommentDTO toDTO(final Comment comment) {
        return modelMapper.map(comment, CommentDTO.class);
    }

    public List<CommentDTO> toDTO(final List<Comment> comments) {
        return comments.stream().map(this::toDTO).collect(Collectors.toList());
    }

}
