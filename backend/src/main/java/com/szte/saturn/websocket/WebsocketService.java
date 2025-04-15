package com.szte.saturn.websocket;

import com.szte.saturn.dtos.CommentDTO;
import com.szte.saturn.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebsocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void notifyUser(final User user, final CommentDTO comment) {
        messagingTemplate.convertAndSendToUser(user.getEmail(), "topic/comments", comment);
    }
}
