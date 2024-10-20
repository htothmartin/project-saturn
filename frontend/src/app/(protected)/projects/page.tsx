'use client';

import { getProjectForUser } from '@/api/project';
import { ProjectCard } from '@/components/Project/Card';
import { Project } from '@/model/project';
import { Dice1 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = (): JSX.Element => {
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);

  const fetchProjects = async () => {
    const { data } = await getProjectForUser();
    setProjects(data);
  };

  useEffect(() => {
    if (!projects) {
      fetchProjects();
    }
  });
  console.log(projects);

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-8">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
export default Home;
