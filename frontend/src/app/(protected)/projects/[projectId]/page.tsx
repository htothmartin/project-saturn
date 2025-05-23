"use client";

import { updateTicket } from "@/api/ticket";
import { Card } from "@/components/Board/Card";
import { Column } from "@/components/Board/Column";
import { Loader } from "@/components/Loader";
import { TicketStatus } from "@/enums/TicketStatus";
import { selectProjects } from "@/lib/store/features/project/projectSelectors";
import { fetchProjects } from "@/lib/store/features/project/projectSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Ticket } from "@/model/tickets";
import {
  DragEndEvent,
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCorners,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type ColumnType = {
  id: string;
  title: string;
};

const columns: ColumnType[] = [
  {
    id: TicketStatus.COMMITED,
    title: "Commited",
  },
  {
    id: TicketStatus.IN_PROGRESS,
    title: "In Progress",
  },
  {
    id: TicketStatus.IN_REVIEW,
    title: "In Review",
  },
  {
    id: TicketStatus.BLOCKED,
    title: "Blocked",
  },
  {
    id: TicketStatus.CLOSED,
    title: "Closed",
  },
];

const Project = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { activeProject, isActiveJobFetching } = useAppSelector(selectProjects);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    if (activeProject?.tickets) {
      setTickets(activeProject?.tickets);
    }
  }, [activeProject?.tickets]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveTicket(active.data.current?.ticket ?? null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    const isActiveATask = active.data.current?.type === "Item";
    const isOverATask = over.data.current?.type === "Item";
    if (!isActiveATask) return;
    if (isActiveATask && isOverATask) {
      setTickets((prevTickets) => {
        const activeIndex = prevTickets.findIndex((t) => t.id === activeId);
        const overIndex = prevTickets.findIndex((t) => t.id === overId);
        if (prevTickets[activeIndex].status != prevTickets[overIndex].status) {
          const newTickets = prevTickets.map((t) => {
            if (t.id === activeId) {
              return { ...t, status: prevTickets[overIndex].status };
            }
            return t;
          });
          return newTickets.slice().sort((a, b) => {
            if (a < b) {
              return -1;
            } else if (a > b) {
              return 1;
            } else {
              return 0;
            }
          });
          //return arrayMove(newTickets, activeIndex, overIndex - 1);
        }

        return prevTickets.slice().sort((a, b) => {
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        });
        //return arrayMove(prevTickets, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveATask && isOverAColumn) {
      setTickets((prevTickets) => {
        const newTickets = prevTickets.map((t) => {
          if (t.id === activeId) {
            return { ...t, status: overId as TicketStatus };
          }
          return t;
        });

        return newTickets.sort((a, b) => {
          if (a < b) {
            return -1;
          } else if (a > b) {
            return 1;
          } else {
            return 0;
          }
        });

        //return arrayMove(newTickets, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active } = event;
    if (!activeTicket || !active) {
      return;
    }

    try {
      await updateTicket(projectId, activeTicket.id.toString(), {
        status: active.data.current?.ticket.status as TicketStatus,
      });
      if (active.data.current?.ticket.status == TicketStatus.CLOSED) {
        dispatch(fetchProjects());
      }
    } catch (error) {
      console.error(error);
    }
    setActiveTicket(null);
  };

  if (isActiveJobFetching || !activeProject) {
    return <Loader />;
  }

  return (
    <div className="h-full w-full overflow-x-auto">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
      >
        <div className="flex">
          {columns.map((column) => (
            <Column
              key={`column-${column.id}`}
              id={column.id.toString()}
              title={column.title}
              items={tickets.filter((item) => item.status === column.id)}
            />
          ))}
        </div>
        {createPortal(
          <DragOverlay>
            {activeTicket && <Card ticket={activeTicket} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default Project;
