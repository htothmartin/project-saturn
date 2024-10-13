import { Project } from '@/model/project';
import { protectedApi } from './protectedApi';

export const createProject = async (project: Project) => {
  return await protectedApi.post('/project/create', { ...project });
};
