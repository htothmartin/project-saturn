package com.szte.saturn.controllers.dtos;

import lombok.Data;

@Data
public class CreateCommentDto {
    private Long authorId;
    private String content;
}
