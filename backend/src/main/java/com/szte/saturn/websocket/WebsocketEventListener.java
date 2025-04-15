package com.szte.saturn.websocket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
public class WebsocketEventListener {

    @EventListener
    public void handleWebSocketConnectListener(final SessionConnectedEvent event) {
        log.info("Websocket connection established");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(final SessionDisconnectEvent event) {
        log.info("Websocket connection lost");
    }
}
