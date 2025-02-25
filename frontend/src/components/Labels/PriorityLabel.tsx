import { TicketPriority } from '@/enums/TicketPriority';
import {
  ChevronDown,
  ChevronsUp,
  ChevronUp,
  StretchHorizontal,
} from 'lucide-react';

type Props = {
  type: TicketPriority;
};

type LabelData = {
  color: string;
  text: string;
  icon: React.ElementType;
};

export const PriorityLabel = ({ type }: Props): JSX.Element => {
  const content = (): LabelData => {
    switch (type) {
      case TicketPriority.LOW:
        return {
          color: 'bg-green-100 text-green-500',
          text: 'Low',
          icon: ChevronDown,
        };
      case TicketPriority.MEDIUM:
        return {
          color: 'bg-yellow-100 text-yellow-500',
          text: 'Medium',
          icon: StretchHorizontal,
        };
      case TicketPriority.HIGH:
        return {
          color: 'bg-orange-100 text-orange-500',
          text: 'High',
          icon: ChevronUp,
        };
      case TicketPriority.CRITICAL:
        return {
          color: 'bg-red-100 text-red-500',
          text: 'Critical',
          icon: ChevronsUp,
        };
    }
  };

  const { color, text, icon: Icon } = content();

  return (
    <div
      className={`flex w-fit items-center rounded bg-opacity-80 p-2 dark:bg-opacity-95 ${color}`}>
      <Icon className="h-5 w-5" />
      <span className="font-semibold">{text}</span>
    </div>
  );
};
