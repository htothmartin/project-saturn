"use client";

import { ProjectCard } from "@/components/Project/Card";

import {
  selectFilter,
  selectProjects,
} from "@/lib/store/features/project/projectSelectors";
import {
  fetchProjects,
  setSortOrder,
} from "@/lib/store/features/project/projectSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { useEffect, useMemo } from "react";
import { TopBar } from "./components/TopBar";
import { SortOrder } from "@/enums/SortOrder";
import { Loader } from "@/components/Loader";

const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { sort, q } = useAppSelector(selectFilter);
  const { projects, isProjectsFetching } = useAppSelector(selectProjects);

  useEffect(() => {
    if (!isProjectsFetching && !projects) {
      dispatch(fetchProjects());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  const pinnedProjects = useMemo(
    () => projects?.filter((project) => project.pin),
    [projects],
  );

  const notPinnedProjects = useMemo(
    () => projects?.filter((project) => !project.pin),
    [projects],
  );

  const Body = () => {
    if (isProjectsFetching) {
      return <Loader />;
    }

    if (pinnedProjects?.length === 0 && notPinnedProjects?.length === 0) {
      return (
        <div className="flex h-1/2 w-full items-center justify-center">
          No projects to display
        </div>
      );
    }
    return (
      <div className="mx-auto mt-8 flex h-full w-full flex-wrap justify-center gap-8">
        {pinnedProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {notPinnedProjects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  };

  return (
    <>
      <TopBar
        onSearchClick={(sortOrder: SortOrder) => {
          dispatch(setSortOrder(sortOrder));
        }}
        q={q}
        sort={sort}
      />
      {Body()}
    </>
  );
};
export default Home;
