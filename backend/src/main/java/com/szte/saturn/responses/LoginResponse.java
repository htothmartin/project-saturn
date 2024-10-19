package com.szte.saturn.responses;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter @Setter
@Accessors(chain = true)
public class LoginResponse {
    private String message;
    private String accessToken;
    private Long expiresIn;
}
