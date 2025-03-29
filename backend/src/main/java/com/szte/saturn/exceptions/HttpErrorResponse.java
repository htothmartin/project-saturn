package com.szte.saturn.exceptions;

import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
public class HttpErrorResponse {
    private final String message;
    private final int status;
    private Map<String, String> errors;
    private List<String> generalErrors;

    public HttpErrorResponse(String message, int status, Map<String, String> errors, List<String> generalErrors) {
        this.message = message;
        this.status = status;
        this.errors = errors;
        this.generalErrors = generalErrors;
    }

    public HttpErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
