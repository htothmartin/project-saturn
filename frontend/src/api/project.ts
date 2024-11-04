import { CreateProjectModel } from '@/model/CreateProject';
import { protectedApi } from './axios';

export const createNewProject = async (project: CreateProjectModel) => {
  return await protectedApi.post('/projects/create', { ...project });
};
export const getProjectForUser = async () => {
  return await protectedApi.get('/projects/');
};
