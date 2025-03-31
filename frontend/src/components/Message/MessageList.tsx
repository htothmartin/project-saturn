import type { Comment } from "@/model/comment";
import { Message } from "./Message";

export type Props = {
  messages: Comment[] | null;
};

export const MessageList = ({ messages }: Props) => {
  if (!messages) {
    return <></>;
  }

  return (
    <div>
      {messages.map((message, index) => (
        <Message key={`message-${index}`} {...message} />
      ))}
    </div>
  );
};
