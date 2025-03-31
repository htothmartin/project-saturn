import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
import { createMessage } from "@/api/ticket";
import { useAppSelector } from "@/lib/store/hooks";
import { selectSession } from "@/lib/store/features/session/session-selectors";

export const MessageInput = () => {
  const { projectId, ticketId } = useParams<{
    projectId: string;
    ticketId: string;
  }>();
  const [message, setMessage] = useState<string>("");
  const { currentUser } = useAppSelector(selectSession);

  const sendMessage = async () => {
    if (currentUser) {
      await createMessage(projectId, ticketId, currentUser.id, message);
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
