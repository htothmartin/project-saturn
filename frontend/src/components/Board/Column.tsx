"use client";

import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Card } from "./Card";
import { Ticket } from "@/model/tickets";

type Props = {
  id: string;
  title: string;
  items: Ticket[];
};

export const Column = ({ id, title, items }: Props): React.JSX.Element => {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "Column",
    },
  });

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        className="my-2 ml-2 h-full min-h-96 w-full min-w-52 flex-1 rounded border-2 border-solid border-purple-300 bg-secondary p-5"
      >
        <div className="pb-4 text-center font-bold">{title}</div>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <Card key={`item-${item.id}`} ticket={item} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};
