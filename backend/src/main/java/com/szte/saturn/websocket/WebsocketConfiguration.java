package com.szte.saturn.websocket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
@Slf4j
public class WebsocketConfiguration implements WebSocketMessageBrokerConfigurer {
    private final AuthHandshakeInterceptor authHandshakeInterceptor;

    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
         registry.addEndpoint("/ws")
                 .setAllowedOrigins("*")
                 .addInterceptors(authHandshakeInterceptor)
                 .setHandshakeHandler(new UserHandshakeHandler());
    }

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/ws");
        registry.enableSimpleBroker("/topic");
    }
}


