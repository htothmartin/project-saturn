import type { Comment } from '@/model/comment';
import { Message } from './Message';

export type Props = {
  messages: Comment[];
};

export const MessageList = ({ messages }: Props) => {
  return (
    <div>
      {messages.map((message, index) => (
        <Message key={`message-${index}`} {...message} />
      ))}
    </div>
  );
};
