import { Project } from '@/model/project';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { ProjectStatusBadge } from '../ProjectStatus';
import Link from 'next/link';
import { Pin } from '@/assets/icons/Pin';
import { pinProject } from '@/api/project';
import { useAppDispatch } from '@/lib/store/hooks';
import { pinProjectSuccess } from '@/lib/store/features/project/projectSlice';

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const handlePinProject = async () => {
    try {
      const { data } = await pinProject(project.id);
      dispatch(pinProjectSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="h-60 w-[450px]">
      <CardHeader className="flex flex-row gap-8 text-center">
        <Button variant="ghost" onClick={handlePinProject}>
          <Pin filled={project.pin} />
        </Button>

        {project.name}
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Project actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mark as closed</DropdownMenuItem>
              <DropdownMenuItem>Add new member</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row py-4">
          <ProjectStatusBadge statusType={project.projectStatus} />
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
