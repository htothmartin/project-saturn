import { ProjectStatus, ProjectStatusMap } from "@/enums/ProjectStatus";
import { Badge } from "../ui/badge";

type Props = {
  statusType: string;
};

export const ProjectStatusBadge = ({
  statusType,
}: Props): React.JSX.Element => {
  switch (statusType) {
    case ProjectStatus.ACTIVE:
      return <Badge variant="green">{ProjectStatusMap[statusType]}</Badge>;
    case ProjectStatus.COMPLETED:
      return <Badge variant="green">{ProjectStatusMap[statusType]}</Badge>;
    case ProjectStatus.IN_PROGRESS:
      return <Badge variant="blue">{ProjectStatusMap[statusType]}</Badge>;
    case ProjectStatus.FINISHED:
      return <Badge variant="green">{ProjectStatusMap[statusType]}</Badge>;
    default:
      return <Badge variant="destructive">No status</Badge>;
  }
};
