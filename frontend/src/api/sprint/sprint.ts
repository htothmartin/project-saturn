import { Sprint } from "@/model/sprint";
import { protectedApi } from "../axios";
import { SprintCreateRequest } from "./type";

export const createSprint = async (
  body: SprintCreateRequest,
): Promise<Sprint> => {
  const reponse = await protectedApi.post<Sprint>("/sprints", body);
  return reponse.data;
};
