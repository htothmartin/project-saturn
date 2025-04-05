package com.szte.saturn.controllers;

import com.szte.saturn.controllers.requests.CreateUserRequest;
import com.szte.saturn.controllers.requests.LoginUserRequest;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.exceptions.ApiException;
import com.szte.saturn.exceptions.ExpiredRefreshTokenException;
import com.szte.saturn.responses.LoginResponse;
import com.szte.saturn.responses.RefreshResponse;
import com.szte.saturn.services.AuthenticationService;
import com.szte.saturn.services.JwtService;
import com.szte.saturn.services.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public final class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final UserService userService;

    private final UserDetailsService userDetailsService;

    private static final int SECOND_IN_MILLISECONDS = 1000;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> register(@RequestBody final CreateUserRequest request) {
        UserDTO registeredUser = userService.create(request);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody final LoginUserRequest request) {
        UserDTO authenticatedUser = authenticationService.login(request);

        String accessToken = jwtService.generateToken(authenticatedUser.getId(), false);
        String refreshToken = jwtService.generateToken(authenticatedUser.getId(), true);

        ResponseCookie jwtCookie = ResponseCookie.from("refresh-token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtService.getRefreshExpiration() / SECOND_IN_MILLISECONDS)
                .sameSite("Strict")
                .build();

        LoginResponse loginResponse = new LoginResponse()
                .setMessage("success")
                .setAccessToken(accessToken);

        return ResponseEntity.ok().header("Set-Cookie", jwtCookie.toString()).body(loginResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refresh(final HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            throw ApiException.builder()
                    .message("No refresh token provided")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
        }

        String refreshToken = "";
        String newAccessToken = "";

        for (Cookie cookie : cookies) {
            if ("refresh-token".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
            }
        }

        if (refreshToken.isEmpty()) {
            throw ApiException.builder()
                    .message("No refresh token provided")
                    .status(HttpStatus.BAD_REQUEST.value())
                    .build();
        }

        try {
            final String userEmail = jwtService.extractUsername(refreshToken, true);
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            if (jwtService.isValidToken(refreshToken, userDetails, true)) {
                UserDTO user = userService.getUserByEmail(userEmail);

                newAccessToken = jwtService.generateToken(user.getId(), false);
                refreshToken = jwtService.generateToken(user.getId(), true);
            }
        } catch (ExpiredJwtException exception) {
            throw new ExpiredRefreshTokenException(exception.getMessage());
        } catch (Exception exception) {
            throw ApiException.builder()
                    .message("Invalid or expired JWT token")
                    .status(HttpStatus.UNAUTHORIZED.value()).build();
        }

        ResponseCookie cookie = ResponseCookie.from("refresh-token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtService.getRefreshExpiration() / SECOND_IN_MILLISECONDS)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body(new RefreshResponse().setAccessToken(newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(final HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            SecurityContextHolder.clearContext();
        }

        ResponseCookie cookie = ResponseCookie.from("refresh-token", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).build();
    }
}
