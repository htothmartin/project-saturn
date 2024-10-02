package com.szte.saturn.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegisterUserDto {

    private String email;

    private String firstName;

    private String lastName;

    private String password;
}
