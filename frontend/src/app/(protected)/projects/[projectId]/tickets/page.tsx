"use client";

import { Button } from "@/components/ui/button";

import { ModalTypes } from "@/enums/ModalTypes";
import { useModal } from "@/hooks/useModal";
import { selectActiveProject } from "@/lib/store/features/project/projectSelectors";
import { useAppSelector } from "@/lib/store/hooks";

import Link from "next/link";
import { useParams } from "next/navigation";
import { TicketTable } from "./components/ticket-table";
import { useMemo } from "react";
import { Ticket } from "@/model/tickets";
import { PlusCircle } from "lucide-react";

const Tickets = (): React.JSX.Element => {
  const activeProject = useAppSelector(selectActiveProject);
  const { getModalUrl } = useModal();
  const BACKLOG = "backlog";

  const filteredTickets = useMemo(() => {
    const result: Record<string, Ticket[]> = {};

    activeProject?.tickets.forEach((ticket) => {
      const sprintId = ticket.sprintId || BACKLOG;
      if (!result[sprintId]) {
        result[sprintId] = [];
      }

      result[sprintId].push(ticket);
    });
    return result;
  }, [activeProject]);

  const { projectId } = useParams<{
    projectId: string;
  }>();

  return (
    <div className="w-full flex-1 flex-col overflow-y-auto p-4">
      <div className="flex">
        <Link href={getModalUrl(ModalTypes.AddTicket)}>
          <Button className="flex gap-2">
            Add ticket
            <PlusCircle />
          </Button>
        </Link>
      </div>
      <h2 className="mt-4 text-3xl">Sprints</h2>
      {activeProject?.sprints.map((sprint) => (
        <div key={`sprint-table-${sprint.id}`} className="m-4 rounded border">
          <div className="m-4 flex items-center justify-between">
            <h3 className="text-2xl">{sprint.name}</h3>
            <p>{`${new Date(sprint.startDate).toDateString()} - ${new Date(sprint.endDate).toDateString()}`}</p>
          </div>
          <TicketTable
            ticketKey={activeProject.key}
            projectId={projectId}
            tickets={filteredTickets[sprint.id]}
          />
        </div>
      ))}
      <div className="m-4 rounded border">
        <div className="m-4 flex items-center">
          <h2 className="text-2xl">Backlog</h2>
        </div>

        <TicketTable
          ticketKey={activeProject?.key ?? ""}
          projectId={projectId}
          tickets={filteredTickets[BACKLOG]}
        />
      </div>
    </div>
  );
};

export default Tickets;
