import { Project } from '@/model/project';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import { Progress } from '../ui/progress';

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props): JSX.Element => {
  return (
    <Card>
      <CardHeader>{project.name}</CardHeader>
      <CardContent>
        <Image
          src={project.imageUrl}
          alt="Project Image"
          width={200}
          height={200}
        />
        <Progress value={49} />
      </CardContent>
    </Card>
  );
};
