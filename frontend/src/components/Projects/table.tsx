'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Project } from '@/model/project';
import { useState } from 'react';

type Props = {
  projects: Project[];
};

export const ProjectTable = ({ projects }: Props): JSX.Element => {
  const [imageList, setImageList] = useState<string[]>([]);

  const getImages = async () => {
    try {
      const promises = Promise.all(
        projects.map(async (project) => {
          return await fetch(project.imageUrl).then((resp) => resp.url);
        }),
      );
      promises.then((p) => {
        setImageList(p);
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (imageList.length === 0) {
    getImages();
  }

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Project name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Current sprint</TableHead>
          <TableHead>Current sprint progress</TableHead>
          <TableHead className="text-right">Manage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => {
          return (
            <TableRow
              key={project.id}
              className="hover:cursor-pointer"
              onClick={() => {
                console.log(project.id);
              }}>
              <TableCell className="font-medium">
                <div className="flex flex-row">
                  {project.name}
                  <img
                    src={imageList[project.id - 1]}
                    height={64}
                    width={64}
                    alt="Icon"
                  />
                </div>
              </TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>{project.currentSprint}</TableCell>
              <TableCell>
                <Progress value={project.sprintProgress} />
              </TableCell>
              <TableCell className="text-right">
                <Button>Manage</Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
