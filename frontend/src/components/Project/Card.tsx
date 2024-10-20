import { Project } from '@/model/project';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
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

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props): JSX.Element => {
  return (
    <Card className="w-[450px]">
      <CardHeader className="flex flex-row gap-8 text-center">
        <Image
          src={project.imageUrl}
          alt="Project Image"
          width={70}
          height={70}
          className="rounded"
        />
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
        <div className="flex">
          <Button>Open</Button>
        </div>
        <Progress value={49} />
      </CardContent>
    </Card>
  );
};
