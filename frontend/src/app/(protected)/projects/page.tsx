'use client';
import { ProjectCard } from '@/components/Project/Card';
import {
  fetchProjects,
  selectProjects,
} from '@/lib/store/features/project/projectSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useEffect } from 'react';

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { projects, isProjectsFetching } = useAppSelector(selectProjects);

  useEffect(() => {
    if (projects.length === 0 && !isProjectsFetching) {
      dispatch(fetchProjects());
    }
  }, []);

  return (
    <div className="mt-8 flex h-full w-full flex-wrap justify-start gap-8">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
export default Home;
