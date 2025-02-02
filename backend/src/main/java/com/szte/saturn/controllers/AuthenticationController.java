package com.szte.saturn.controllers;

import com.szte.saturn.controllers.dtos.RegisterUserDto;
import com.szte.saturn.dtos.UserDTO;
import com.szte.saturn.entities.User;
import com.szte.saturn.responses.LoginResponse;
import com.szte.saturn.responses.RefreshResponse;
import com.szte.saturn.services.AuthenticationService;
import com.szte.saturn.services.JwtService;
import com.szte.saturn.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final UserService userService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserService userService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signUp(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.signIn(loginUserDto);

        String accessToken = jwtService.generateToken(authenticatedUser.getId(), false);
        String refreshToken = jwtService.generateToken(authenticatedUser.getId(), true);

        ResponseCookie jwtCookie = ResponseCookie.from("refresh-token", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtService.getRefreshExpirationTime() / 1000)
                .sameSite("Strict")
                .build();

        LoginResponse loginResponse = new LoginResponse().setMessage("success").setAccessToken(accessToken);

        return ResponseEntity.ok().header("Set-Cookie", jwtCookie.toString()).body(loginResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        
        if(cookies == null) {
            return ResponseEntity.badRequest().body("No refresh-token provided");
        }

        String refreshToken = "";
        String newAccessToken = "";

        for(Cookie cookie : cookies){
            if("refresh-token".equals(cookie.getName())){
                refreshToken = cookie.getValue();
            }
        }

        if( !refreshToken.isEmpty()){

            final String userEmail = jwtService.extractUsername(refreshToken);
            final UserDTO currentUser = userService.getUserByEmail(userEmail);

            newAccessToken = jwtService.generateToken(currentUser.getId(), false);
        }

        return ResponseEntity.ok(new RefreshResponse().setAccessToken(newAccessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
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

        return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).body("Successfully logged out");
    }

    @Getter
    @Setter
    public static class LoginUserDto {

        private String email;

        private String password;
    }
}
