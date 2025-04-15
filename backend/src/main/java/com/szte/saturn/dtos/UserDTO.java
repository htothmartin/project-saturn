package com.szte.saturn.dtos;

import com.szte.saturn.enums.Provider;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {

    private Long id;

    private String firstname;

    private String lastname;

    private String profilePictureUrl;

    private String email;

    private Provider provider;

    private List<ConnectedAccountDTO> connectedAccounts;

}
