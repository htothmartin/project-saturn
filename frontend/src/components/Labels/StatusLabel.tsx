import { TicketStatus } from '@/enums/TicketStatus';

type Props = {
  type: TicketStatus;
};

type LabelData = {
  color: string;
  text: string;
};

export const StatusLabel = ({ type }: Props): JSX.Element => {
  const content = (): LabelData => {
    switch (type) {
      case TicketStatus.COMMITED:
        return {
          color: 'bg-purple-500',
          text: 'Commited',
        };
      case TicketStatus.IN_PROGRESS:
        return {
          color: 'bg-blue-500',
          text: 'In progress',
        };
      case TicketStatus.IN_REVIEW:
        return {
          color: 'bg-yellow-500',
          text: 'In review',
        };
      case TicketStatus.BLOCKED:
        return {
          color: 'bg-red-500',
          text: 'Blocked',
        };
      case TicketStatus.CLOSED:
        return {
          color: 'bg-green-700',
          text: 'Closed',
        };
    }
  };

  const { color, text } = content();

  return (
    <div
      className={`flex min-w-28 justify-center rounded bg-opacity-80 p-2 align-middle dark:bg-opacity-95 ${color}`}>
      <span className="font-semibold">{text}</span>
    </div>
  );
};
