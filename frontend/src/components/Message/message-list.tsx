import type { Comment } from "@/model/comment";
import { Message } from "./message";

export type Props = {
  messages: Comment[] | null;
};

export const MessageList = ({ messages }: Props) => {
  if (!messages) {
    return <></>;
  }

  return (
    <div className="flex h-full flex-col gap-2 overflow-scroll">
      {messages.map((message, index) => (
        <Message key={`message-${index}`} {...message} />
      ))}
    </div>
  );
};
