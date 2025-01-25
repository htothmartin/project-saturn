package com.szte.saturn.dtos;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;

    private String firstname;

    private String lastname;

    private String profilePictureUrl;
}
