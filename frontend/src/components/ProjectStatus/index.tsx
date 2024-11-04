import { ProjectStatus } from '@/enums/ProjectStatus';
import { Badge } from '../ui/badge';

type Props = {
  statusType: string;
};

export const ProjectStatusBadge = ({ statusType }: Props): JSX.Element => {
  console.log(statusType);
  switch (statusType) {
    case ProjectStatus.ACTIVE:
      return <Badge variant="green">{ProjectStatus.ACTIVE}</Badge>;
    case ProjectStatus.COMPLETED:
      return <Badge variant="green">{ProjectStatus.ACTIVE}</Badge>;
    case ProjectStatus.IN_PROGRESS:
      return <Badge variant="blue">{ProjectStatus.ACTIVE}</Badge>;
    case ProjectStatus.FINISHED:
      return <Badge variant="green">{ProjectStatus.ACTIVE}</Badge>;
    default:
      return <Badge variant="destructive">Undifined</Badge>;
  }
};
