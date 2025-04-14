import { ProjectStatus } from "@/enums/ProjectStatus";
import { Badge } from "../ui/badge";

type Props = {
  statusType: string;
};

export const ProjectStatusBadge = ({
  statusType,
}: Props): React.JSX.Element => {
  switch (statusType) {
    case ProjectStatus.ACTIVE:
      return <Badge variant="green">{ProjectStatus.ACTIVE}</Badge>;
    case ProjectStatus.COMPLETED:
      return <Badge variant="green">{ProjectStatus.COMPLETED}</Badge>;
    case ProjectStatus.IN_PROGRESS:
      return <Badge variant="blue">{ProjectStatus.IN_PROGRESS}</Badge>;
    case ProjectStatus.FINISHED:
      return <Badge variant="green">{ProjectStatus.FINISHED}</Badge>;
    default:
      return <Badge variant="destructive">Undifined</Badge>;
  }
};
