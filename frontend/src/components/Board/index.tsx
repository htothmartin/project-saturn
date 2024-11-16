import { Ticket } from '@/model/tickets';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { BoardItem } from './BoardItem';

type Props = {
  id: string;
  tickets: Ticket[];
};

export function Board({ id, tickets }: Props): JSX.Element {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div
      key={`board-${id}`}
      className="h-full w-full rounded-md border-2 border-solid border-foreground bg-secondary">
      Board
      <SortableContext
        id={id}
        items={tickets}
        strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} style={style}>
          {tickets.map((ticket) => (
            <BoardItem key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
