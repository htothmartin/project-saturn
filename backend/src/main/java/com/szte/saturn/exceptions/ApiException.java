package com.szte.saturn.exceptions;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.io.Serial;
import java.io.Serializable;
import java.util.Map;

@Getter
@Builder
public class ApiException extends RuntimeException implements Serializable {

    @Serial
    private static final long serialVersionUID = -3218890486621619643L;

    private String message;
    private int status = HttpStatus.BAD_REQUEST.value();
    private Map<String, String> errors;
}
