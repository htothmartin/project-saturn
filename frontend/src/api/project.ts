import { protectedApi } from './protectedApi';
import { CreateProjectModel } from '@/model/CreateProject';

export const CreateNewProject = async (project: CreateProjectModel) => {
  return await protectedApi.post('/project/create', { ...project });
};
export const getProjectForUser = async () => {
  return await protectedApi.get('/projects/');
};
