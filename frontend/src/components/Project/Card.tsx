import { Project } from "@/model/project";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ProjectStatusBadge } from "../ProjectStatus";
import Link from "next/link";
import { Pin } from "@/assets/icons/Pin";
import { deleteProject, pinProject } from "@/api/project/project";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchProjects,
  pinProjectSuccess,
} from "@/lib/store/features/project/projectSlice";
import { Badge } from "../ui/badge";
import { useModal } from "@/hooks/useModal";
import { ModalTypes } from "@/enums/ModalTypes";
import { selectSession } from "@/lib/store/features/session/session-selectors";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { getModalUrl } = useModal();
  const { currentUser } = useAppSelector(selectSession);

  const handlePinProject = async () => {
    try {
      const { data } = await pinProject(project.id);
      dispatch(pinProjectSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      await deleteProject(projectId);
      dispatch(fetchProjects());
    } catch (error) {
      console.error(error);
    }
  };

  const isOwner = currentUser?.id === project.owner.id;

  return (
    <Card className="h-60 w-[450px]">
      <CardHeader className="flex flex-row items-center gap-6 text-center">
        <Button variant="ghost" onClick={handlePinProject}>
          <Pin filled={project.pin} />
        </Button>
        <p>{project.name}</p>
        {isOwner && (
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Project actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mark as closed</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    getModalUrl(
                      ModalTypes.AddMember,
                      `projects/${project.id}/members`,
                    )
                  }
                >
                  Add new member
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-row gap-2 py-4">
          <ProjectStatusBadge statusType={project.projectStatus} />
          {isOwner && <Badge>Owner</Badge>}
          <div className="ml-auto">
            <Link href={`projects/${project.id}`}>
              <Button>Open</Button>
            </Link>
          </div>
        </div>
        <Progress value={(project.closedTickets / project.ticketCount) * 100} />
      </CardContent>
    </Card>
  );
};
