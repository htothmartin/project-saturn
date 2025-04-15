package com.szte.saturn.websocket;

import com.szte.saturn.services.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class AuthHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    public boolean beforeHandshake(@NotNull final ServerHttpRequest request,
                                   @NotNull final ServerHttpResponse response,
                                   @NotNull final WebSocketHandler wsHandler,
                                   @NotNull final Map<String, Object> attributes) {

        if (!(request instanceof ServletServerHttpRequest servletRequestWrapper)) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return false;
        }

        HttpServletRequest servletRequest = servletRequestWrapper.getServletRequest();

        String token = servletRequest.getParameter("token");

        if (token == null || token.isBlank()) {
            log.warn("Missing or blank token in WebSocket handshake");
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return false;
        }

        log.info("Received token: {}", token);

        try {
            final String userEmail = jwtService.extractUsername(token, false);
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            if (jwtService.isValidToken(token, userDetails, false)) {
                attributes.put("username", userDetails.getUsername());
                log.info("WebSocket handshake authorized for user: {}", userDetails.getUsername());
                return true;
            }
        } catch (Exception e) {
            log.error("Token validation error during WebSocket handshake", e);
        }

        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return false;
    }

    @Override
    public void afterHandshake(@NotNull final ServerHttpRequest request,
                               @NotNull final ServerHttpResponse response,
                               @NotNull final WebSocketHandler wsHandler,
                               final Exception exception) {
    }
}
