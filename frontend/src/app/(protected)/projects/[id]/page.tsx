'use client';

import { Board } from '@/components/Board';
import { DraggableTicket } from '@/components/DraggableTicket';
import {
  useDroppable,
  useDraggable,
  DragOverlay,
  UniqueIdentifier,
  DragEndEvent,
  DndContext,
} from '@dnd-kit/core';
import { useState } from 'react';

const Project = (): JSX.Element => {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const ticket = <DraggableTicket id="asd" />;

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    setParent(over ? over.id : null);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? ticket : null}
      <div className="m-4 grid h-full w-full grid-cols-4 gap-4">
        <Board id="commited">{parent === 'commited' ? ticket : <></>}</Board>
        <Board id="inprogress">
          {parent === 'inprogress' ? ticket : <></>}
        </Board>
        <Board id="review">{parent === 'review' ? ticket : <></>}</Board>
        <Board id="closed">{parent === 'closed' ? ticket : <></>}</Board>
      </div>
    </DndContext>
  );
};

export default Project;
