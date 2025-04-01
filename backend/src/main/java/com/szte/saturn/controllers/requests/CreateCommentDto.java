package com.szte.saturn.controllers.requests;

import lombok.Data;

@Data
public class CreateCommentDto {
    private Long authorId;
    private String content;
}
