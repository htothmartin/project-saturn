import { ActiveProject, ProjectForm } from "@/model/project";
import { protectedApi } from "../axios";
import { Filter } from "@/model/filter";
import { UserIdWithRole } from "./type/user-id-with-role";

export const createNewProject = async (project: ProjectForm) => {
  return await protectedApi.post("/projects", { ...project });
};
export const getProjectForUser = async (filter: Filter) => {
  return await protectedApi.get("/projects", {
    params: {
      ...filter,
    },
  });
};

export const getActiveProject = async (id: string) => {
  return await protectedApi.get(`/projects/${id}`);
};

export const deleteProject = async (id: number) => {
  return await protectedApi.delete(`/projects/${id}`);
};

export const pinProject = async (id: number) => {
  return await protectedApi.post(`/projects/${id}/pin`);
};

export const addUserToProject = async (
  projectId: string,
  body: UserIdWithRole[],
) => {
  return await protectedApi.post(`/projects/${projectId}/users`, body);
};

export const deleteUserfromProject = async (
  projectId: string,
  userId: number,
) => {
  return await protectedApi.delete(`/projects/${projectId}/users/${userId}`);
};

export const updateProject = (
  projectId: string | number,
  project: Partial<ActiveProject>,
) => {
  return protectedApi.patch(`/projects/${projectId}`, project);
};
