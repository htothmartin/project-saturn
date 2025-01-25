'use client';
import { ProjectCard } from '@/components/Project/Card';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { SortOrder } from '@/enums/SortOrder';
import {
  selectFilter,
  selectProjects,
} from '@/lib/store/features/project/projectSelectors';
import {
  fetchProjects,
  setSortOrder,
} from '@/lib/store/features/project/projectSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { ArrowDownAZ, ArrowUpAZIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react';

const Home = (): JSX.Element => {
  const { sort, q } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const { projects, isProjectsFetching } = useAppSelector(selectProjects);

  const pinnedProjects = useMemo(
    () => projects.filter((project) => project.pin),
    [projects],
  );

  const notPinnedProjects = useMemo(
    () => projects.filter((project) => !project.pin),
    [projects],
  );

  useEffect(() => {
    if (!isProjectsFetching) {
      dispatch(fetchProjects());
    }
  }, [sort]);

  return (
    <>
      <div className="flex items-center gap-2 p-4">
        <h3 className="text-2xl font-bold">Your projects</h3>
        <div className="ml-auto">Sorting order:</div>
        {sort === 'asc' ? (
          <Button
            onClick={() => {
              dispatch(setSortOrder(SortOrder.Descending));
            }}
            variant="ghost">
            <ArrowDownAZ />
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(setSortOrder(SortOrder.Ascending));
            }}
            variant="ghost">
            <ArrowUpAZIcon />
          </Button>
        )}
        <SearchBar value={q} />
      </div>
      <div className="mx-auto mt-8 flex h-full w-full flex-wrap justify-center gap-8">
        {pinnedProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {notPinnedProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};
export default Home;
