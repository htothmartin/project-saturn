package com.szte.saturn.dtos;

import lombok.Data;

@Data
public class CommentDTO {
    private Long id;

    private String content;

    private UserDTO author;
}
