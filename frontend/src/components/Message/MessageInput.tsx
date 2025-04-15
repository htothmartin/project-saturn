import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
import { createMessage } from "@/api/ticket";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectSession } from "@/lib/store/features/session/session-selectors";
import { appendComments } from "@/lib/store/features/comments/commentSlice";

export const MessageInput = () => {
  const { projectId, ticketId } = useParams<{
    projectId: string;
    ticketId: string;
  }>();
  const [message, setMessage] = useState<string>("");
  const { currentUser } = useAppSelector(selectSession);
  const dispatch = useAppDispatch();

  const sendMessage = async () => {
    if (currentUser) {
      const { data } = await createMessage(
        projectId,
        ticketId,
        currentUser.id,
        message,
      );
      dispatch(appendComments(data));
      setMessage("");
    }
  };

  return (
    <div className="felx-row flex gap-4">
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
