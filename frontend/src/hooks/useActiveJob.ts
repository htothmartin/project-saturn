'use client';

import {
  fetchActiveProject,
  selectProjects,
} from '@/lib/store/features/project/projectSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export const useActiveJob = () => {
  const params = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const { activeProject, isActiveJobFetching } = useAppSelector(selectProjects);

  useEffect(() => {
    if (activeProject === null && !isActiveJobFetching) {
      dispatch(fetchActiveProject(params.projectId));
    }
  }, [activeProject]);

  return { activeProject, isActiveJobFetching };
};
