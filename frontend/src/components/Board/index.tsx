import { useDroppable } from '@dnd-kit/core';

type Props = {
  children: JSX.Element;
  id: string;
};

export function Board({ children, id }: Props): JSX.Element {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div
      className="h-full w-full rounded-md border-2 border-solid border-foreground bg-secondary"
      ref={setNodeRef}
      style={style}>
      Board
      {children}
    </div>
  );
}
