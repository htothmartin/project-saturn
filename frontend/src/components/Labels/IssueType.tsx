import { IssueType } from '@/enums/IssueType';
import { Bug, Check, Plus } from 'lucide-react';

type Props = {
  type: IssueType;
  showText?: boolean;
};

type LabelData = {
  color: string;
  text: string;
  icon: React.ElementType;
};

export const IssueTypeLabel = ({ type, showText }: Props): JSX.Element => {
  const content = (): LabelData => {
    switch (type) {
      case IssueType.BUG:
        return {
          color: 'bg-red-500',
          text: 'Bug',
          icon: Bug,
        };
      case IssueType.FEATURE:
        return {
          color: 'bg-green-500',
          text: 'Feature',
          icon: Plus,
        };
      case IssueType.TASK:
        return {
          color: 'bg-blue-500',
          text: 'Task',
          icon: Check,
        };
    }
  };

  const { color, text, icon: Icon } = content();

  return (
    <div
      className={`flex w-fit items-center gap-2 rounded bg-opacity-80 p-2 dark:bg-opacity-95 ${color}`}>
      <Icon className="h-5 w-5" />
      {showText && <span className="font-semibold">{text}</span>}
    </div>
  );
};
