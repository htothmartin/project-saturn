package com.szte.saturn.exceptions;

import io.jsonwebtoken.JwtException;

import java.io.Serial;
import java.io.Serializable;

public class ExpiredRefreshTokenException extends JwtException implements Serializable {

    @Serial
    private static final long serialVersionUID = -222438787628390055L;

    public ExpiredRefreshTokenException(final String message) {
        super(message);
    }
}
