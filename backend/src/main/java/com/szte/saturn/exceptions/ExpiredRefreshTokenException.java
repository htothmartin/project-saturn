package com.szte.saturn.exceptions;

import io.jsonwebtoken.JwtException;

public class ExpiredRefreshTokenException extends JwtException {

    public ExpiredRefreshTokenException(String message) {
        super(message);
    }
}
