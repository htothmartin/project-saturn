package com.szte.saturn.controllers.dtos;

import lombok.Data;

@Data
public class LoginUserRequest {

    private String email;

    private String password;
}
