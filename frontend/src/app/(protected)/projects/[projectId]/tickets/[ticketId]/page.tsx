"use client";

import { PrioritySelect } from "@/components/LabelSelects/PrioritySelect";
import { SprintSelect } from "@/components/LabelSelects/SprintSelect";
import { StatusSelect } from "@/components/LabelSelects/StatusSelect";
import { UserSelector } from "@/components/LabelSelects/UserSelector";
import { Loader } from "@/components/Loader";
import { MessageInput } from "@/components/Message/message-input";
import { MessageList } from "@/components/Message/message-list";
import { Button } from "@/components/ui/button";
import { UserBadge } from "@/components/UserBadge";
import {
  selectComments,
  selectIsCommentsFetching,
} from "@/lib/store/features/comments/commentSelectors";
import { fetchComments } from "@/lib/store/features/comments/commentSlice";
import { selectTicketById } from "@/lib/store/features/project/projectSelectors";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const TicketDetails = () => {
  const { ticketId, projectId } = useParams<{
    ticketId: string;
    projectId: string;
  }>();
  const dispatch = useAppDispatch();

  const isFetchingComments = useAppSelector(selectIsCommentsFetching);
  const comments = useAppSelector(selectComments);
  const ticket = useAppSelector(selectTicketById(ticketId));

  useEffect(() => {
    if (!comments && !isFetchingComments) {
      dispatch(
        fetchComments({
          projectId: projectId,
          ticketId: ticketId,
        }),
      );
    }
  }, [comments, isFetchingComments, dispatch, projectId, ticketId]);

  if (!ticket) {
    return <Loader />;
  }

  return (
    <div className="flex w-full flex-row gap-2 p-4 shadow-md">
      <div className="flex w-full flex-col">
        <div className="flex-grow">
          <h1 className="m-4 text-xl font-bold">{ticket.title}</h1>
          <p className="m-4 text-gray-600">{ticket.description}</p>
        </div>
        <div className="flex max-h-[30%] flex-col gap-2">
          Messages
          <MessageInput />
          <MessageList messages={comments} />
        </div>
      </div>
      <div className="flex w-1/3 flex-shrink-0 flex-col gap-4 rounded border-2 p-4">
        <Button className="ml-auto" variant="ghost" size="icon" asChild>
          <Link href={`/projects/${projectId}/tickets`}>
            <X />
          </Link>
        </Button>

        <h2 className="mb-2 text-lg font-semibold">Details</h2>
        <div className="flex items-center gap-4">
          <span className="font-medium">Status:</span>
          <StatusSelect type={ticket.status} ticketId={ticket.id} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>Assigned to:</div>
          <UserSelector
            user={ticket.assignee}
            ticketId={ticketId}
            projectId={projectId}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>Reporter:</div>
          <UserBadge user={ticket.reporter} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>Priority:</div>
          <PrioritySelect type={ticket.ticketPriority} ticketId={ticket.id} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <div>Sprint:</div>
          <SprintSelect
            ticketId={ticket.id}
            selectedSprintId={ticket.sprintId}
          />
        </div>

        <p>Created at: {new Date(ticket.createdAt).toLocaleString()}</p>
        <p>Updated at: {new Date(ticket.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TicketDetails;
