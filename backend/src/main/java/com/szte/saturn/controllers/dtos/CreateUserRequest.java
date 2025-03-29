package com.szte.saturn.controllers.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateUserRequest {

    private String email;

    private String firstname;

    private String lastname;

    private String password;
}
