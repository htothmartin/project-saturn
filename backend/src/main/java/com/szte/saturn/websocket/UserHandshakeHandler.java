package com.szte.saturn.websocket;

import com.sun.security.auth.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

@Slf4j
public class UserHandshakeHandler extends DefaultHandshakeHandler {

    @Override
    protected Principal determineUser(@NotNull final ServerHttpRequest request,
                                      @NotNull final WebSocketHandler wsHandler,
                                      final Map<String, Object> attributes) {

        Object username = attributes.get("username");

        log.info("Determined username {}", username);

        if (username instanceof String) {
            return new UserPrincipal((String) username);
        }

        return null;
    }
}
