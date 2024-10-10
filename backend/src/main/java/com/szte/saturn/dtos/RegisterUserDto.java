package com.szte.saturn.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegisterUserDto {

    private String email;

    private String firstname;

    private String lastname;

    private String password;
}
