package com.szte.saturn.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        List<String> generalErrors =  new ArrayList<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            if(error instanceof FieldError fieldError) {
                String fieldName = fieldError.getField();
                String errorMessage = fieldError.getDefaultMessage();
                errors.put(fieldName, errorMessage);
            } else {
                generalErrors.add(error.getDefaultMessage());
            }
        });

        HttpErrorResponse response = new HttpErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY.getReasonPhrase(), HttpStatus.UNPROCESSABLE_ENTITY.value(), errors, generalErrors);

        return new ResponseEntity<>(response, HttpStatusCode.valueOf(response.getStatus()));
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<HttpErrorResponse> handleException(ApiException ex) {
        HttpErrorResponse response = new HttpErrorResponse(ex.getMessage(), ex.getStatus(), ex.getErrors(), null);

        return new ResponseEntity<>(response, HttpStatusCode.valueOf(response.getStatus()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<HttpErrorResponse> handleException(BadCredentialsException ex) {
        HttpErrorResponse response = new HttpErrorResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(response.getStatus()));
    }

    @ExceptionHandler(ExpiredRefreshTokenException.class)
    public ResponseEntity<HttpErrorResponse> handleException(ExpiredRefreshTokenException ex) {
        HttpErrorResponse response = new HttpErrorResponse("Expired refresh token", HttpStatus.UNAUTHORIZED.value());

        ResponseCookie cookie = ResponseCookie.from("refresh-token", "")
                .httpOnly(true)
                .secure(true)
                .path("/api")
                .maxAge(0)
                .sameSite("Strict")
                .build();


        return ResponseEntity
                .status(response.getStatus())
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<HttpErrorResponse> handleException(ExpiredJwtException ex) {
        HttpErrorResponse response = new HttpErrorResponse("Expired token", HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(response.getStatus()));
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<HttpErrorResponse> handleException(AuthorizationDeniedException ex) {
        HttpErrorResponse response = new HttpErrorResponse(ex.getMessage(), HttpStatus.FORBIDDEN.value());
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(response.getStatus()));
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<HttpErrorResponse> handleException(Exception ex) {
        HttpErrorResponse response = new HttpErrorResponse("Unexpected error", HttpStatus.INTERNAL_SERVER_ERROR.value(), null, Arrays.asList(ex.getMessage()));
        return new ResponseEntity<>(response, HttpStatusCode.valueOf(response.getStatus()));
    }

}
