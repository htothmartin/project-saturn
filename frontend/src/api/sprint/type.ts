export type SprintCreateRequest = {
  name: string;
  startDate: Date;
  endDate: Date;
  projectId: string | number;
};
