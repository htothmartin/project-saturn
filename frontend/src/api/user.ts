import { User } from "@/model/user";
import { protectedApi } from "./axios";

export const me = async () => {
  const { data } = await protectedApi.get("users/me");
  return data;
};

export const updateUser = async (userData: Partial<User>) => {
  return await protectedApi.patch("/users", userData);
};

export const fetcAllUser = async () => {
  return await protectedApi.get("/users/");
};

export const fetchUsersNotAssignedToProject = async (projectId: string) => {
  return await protectedApi.get(`/users/not-in-project/${projectId}`);
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return await protectedApi.post("/users/upload-profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
