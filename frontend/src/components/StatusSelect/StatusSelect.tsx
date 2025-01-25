'use client';

import { TicketStatus } from '@/enums/TicketStatus';

const statuses: { label: string; value: TicketStatus; color: string }[] = [
  {
    label: 'Commited',
    value: TicketStatus.COMMITED,
    color: 'bg-grey-500',
  },
  {
    label: 'In Progress',
    value: TicketStatus.IN_PROGRESS,
    color: 'bg-blue-500',
  },
  {
    label: 'In Review',
    value: TicketStatus.IN_REVIEW,
    color: 'bg-yellow-500',
  },
  {
    label: 'Blocked',
    value: TicketStatus.BLOCKED,
    color: 'bg-red-500',
  },
  {
    label: 'Closed',
    value: TicketStatus.CLOSED,
    color: 'bg-grey-500',
  },
];

type Props = {
  selectedStatus: TicketStatus;
  onChange: (value: TicketStatus) => void;
};

export const StatusSelect = ({ selectedStatus, onChange }: Props) => {
  const handleChnage = (event: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value as TicketStatus);

  const selectedColor =
    statuses.find((task) => task.value === selectedStatus)?.color || '';

  return (
    <div className="w-full">
      <select
        value={selectedStatus}
        onChange={handleChnage}
        className={`w-full rounded p-2 ${selectedColor}`}>
        {statuses.map((task) => (
          <option
            key={task.value}
            value={task.value}
            className={`text-primary-foreground`}>
            {task.label}
          </option>
        ))}
      </select>
    </div>
  );
};
