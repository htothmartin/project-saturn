export type Project = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  key: string;
  projectStatus: string;
};

export type ProjectForm = {
  name: string;
  description: string;
  imageUrl: string;
  key: string;
};
