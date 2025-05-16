import { Sprint } from "@/model/sprint";
import { protectedApi } from "../axios";
import { SprintCreateRequest } from "./type";

export const createSprint = async (
  body: SprintCreateRequest,
): Promise<Sprint> => {
  const reponse = await protectedApi.post<Sprint>("/sprints", body);
  return reponse.data;
};

export const deleteSprint = async (sprintId: number) => {
  await protectedApi.delete(`/sprints/${sprintId}`);
};
