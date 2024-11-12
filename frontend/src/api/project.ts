import { ProjectForm } from '@/model/project';
import { protectedApi } from './axios';

export const createNewProject = async (project: ProjectForm) => {
  return await protectedApi.post('/projects', { ...project });
};
export const getProjectForUser = async () => {
  return await protectedApi.get('/projects');
};
