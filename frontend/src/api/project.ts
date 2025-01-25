import { ProjectForm } from '@/model/project';
import { protectedApi } from './axios';
import { Filter } from '@/model/filter';

export const createNewProject = async (project: ProjectForm) => {
  return await protectedApi.post('/projects', { ...project });
};
export const getProjectForUser = async (filter: Filter) => {
  return await protectedApi.get('/projects', {
    params: {
      ...filter,
    },
  });
};

export const getActiveProject = async (id: string) => {
  return await protectedApi.get(`/projects/${id}`);
};

export const pinProject = async (id: number) => {
  return await protectedApi.post(`/projects/${id}/pin`);
};
