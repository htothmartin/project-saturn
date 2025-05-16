package com.szte.saturn.controllers.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreateUserRequest {

    @NotBlank(message = "Please enter a valid email address!")
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", message = "Please enter a valid email address!")
    private String email;

    @NotBlank(message = "Please enter your firstname.")
    private String firstname;

    @NotBlank(message = "Please enter your lastname.")
    private String lastname;

    @NotBlank(message = "Please enter a password!")
    @Size(min = 8, message = "Password should be at least 8 characters!")
    @Pattern(regexp = ".*[a-z].*", message = "The password must contain at least one lowercase character.")
    @Pattern(regexp = ".*[A-Z].*", message = "The password must contain at least one uppercase character.")
    @Pattern(regexp = ".*\\d.*", message = "The password must contain at least one number.")
    @Pattern(regexp = ".*[!@#$%^&*(),.?\":{}|<>].*", message = "The password must contain at least one special character.")
    private String password;
}
