import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectSession } from "@/lib/store/features/session/session-selectors";
import { appendComments } from "@/lib/store/features/comments/commentSlice";

export const useWebsocket = () => {
  const [_, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const { accessToken } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}?token=${accessToken}`,
    );

    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setConnected(true);

        stompClient.subscribe("/user/topic/comments", (message) => {
          const parsedMessage = JSON.parse(message.body);
          dispatch(appendComments(parsedMessage));
        });
      },
      onDisconnect: () => {
        setConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
      reconnectDelay: 5000,
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [accessToken, dispatch]);

  return { connected };
};
