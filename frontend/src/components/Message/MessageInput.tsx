import { Send } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import { createMessage } from '@/api/ticket';
import useAuth from '@/hooks/useAuth';

export const MessageInput = () => {
  const { projectId, ticketId } = useParams<{
    projectId: string;
    ticketId: string;
  }>();
  const { auth } = useAuth();
  const [message, setMessage] = useState<string>('');

  const sendMessage = async () => {
    if (auth.user) {
      const result = await createMessage(
        projectId,
        ticketId,
        auth.user.id,
        message,
      );
    }
  };

  return (
    <div className="felx-row flex">
      <Input
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
      />
      <Button onClick={sendMessage}>
        <Send />
      </Button>
    </div>
  );
};
