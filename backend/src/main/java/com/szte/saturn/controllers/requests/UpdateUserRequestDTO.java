package com.szte.saturn.controllers.requests;

import lombok.Data;

@Data
public class UpdateUserRequestDTO {
    private String firstname;
    private String lastname;
    private String email;
}
