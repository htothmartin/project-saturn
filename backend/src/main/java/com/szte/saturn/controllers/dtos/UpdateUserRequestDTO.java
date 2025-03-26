package com.szte.saturn.controllers.dtos;

import lombok.Data;

@Data
public class UpdateUserRequestDTO {
       private String firstname;

    private String lastname;

    private String email;
}
