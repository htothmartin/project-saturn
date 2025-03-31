"use client";

import { selectProjects } from "@/lib/store/features/project/projectSelectors";
import { fetchActiveProject } from "@/lib/store/features/project/projectSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const useActiveJob = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const { activeProject, isActiveJobFetching } = useAppSelector(selectProjects);

  useEffect(() => {
    if (!isActiveJobFetching && !activeProject) {
      dispatch(fetchActiveProject(projectId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return { activeProject, isActiveJobFetching };
};
